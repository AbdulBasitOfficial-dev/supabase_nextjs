import { z } from "zod";
import { router, protectedProcedure } from "../trpc/init";
import { TRPCError } from "@trpc/server";

export const courseRouter = router({
  // Get paginated courses for the current user
  list: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(50).default(9),
        search: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { page, limit, search } = input;
      const offset = (page - 1) * limit;

      let query = ctx.supabase
        .from("courses")
        .select("*", { count: "exact" })
        .eq("user_id", ctx.user.id)
        .order("created_at", { ascending: false });

      if (search) {
        query = query.or(
          `title.ilike.%${search}%,description.ilike.%${search}%`,
        );
      }

      const { data, error, count } = await query.range(
        offset,
        offset + limit - 1,
      );

      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      return {
        courses: data ?? [],
        totalCount: count ?? 0,
        totalPages: Math.ceil((count ?? 0) / limit),
        currentPage: page,
      };
    }),

  // Get a single course by ID
  getById: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from("courses")
        .select("*")
        .eq("id", input.id)
        .eq("user_id", ctx.user.id)
        .single();

      if (error || !data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Course not found",
        });
      }

      return data;
    }),

  // Create a new course
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1, "Title is required").max(200),
        description: z.string().min(1, "Description is required").max(2000),
        instructor: z.string().min(1, "Instructor is required").max(100),
        duration: z.string().min(1, "Duration is required").max(50),
        level: z.enum(["Beginner", "Intermediate", "Advanced"]),
        category: z.string().min(1, "Category is required").max(100),
        price: z.number().min(0, "Price must be non-negative"),
        image_url: z.string().url().optional().or(z.literal("")),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from("courses")
        .insert({
          ...input,
          user_id: ctx.user.id,
        })
        .select()
        .single();

      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      return data;
    }),

  // Update an existing course
  update: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        title: z.string().min(1).max(200).optional(),
        description: z.string().min(1).max(2000).optional(),
        instructor: z.string().min(1).max(100).optional(),
        duration: z.string().min(1).max(50).optional(),
        level: z.enum(["Beginner", "Intermediate", "Advanced"]).optional(),
        category: z.string().min(1).max(100).optional(),
        price: z.number().min(0).optional(),
        image_url: z.string().url().optional().or(z.literal("")),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;

      // Verify ownership
      const { data: existing } = await ctx.supabase
        .from("courses")
        .select("id")
        .eq("id", id)
        .eq("user_id", ctx.user.id)
        .single();

      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Course not found or you don't have permission to edit it",
        });
      }

      const { data, error } = await ctx.supabase
        .from("courses")
        .update(updateData)
        .eq("id", id)
        .eq("user_id", ctx.user.id)
        .select()
        .single();

      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      return data;
    }),

  // Delete a course
  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      // Verify ownership
      const { data: existing } = await ctx.supabase
        .from("courses")
        .select("id")
        .eq("id", input.id)
        .eq("user_id", ctx.user.id)
        .single();

      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Course not found or you don't have permission to delete it",
        });
      }

      const { error } = await ctx.supabase
        .from("courses")
        .delete()
        .eq("id", input.id)
        .eq("user_id", ctx.user.id);

      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      return { success: true };
    }),
});
