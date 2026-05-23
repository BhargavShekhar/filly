import { trpc } from "~/trpc/client";

export const useCreateForm = () => {
    const utils = trpc.useUtils();

    const {
        mutateAsync: createFormAsync,
        mutate: createForm,
        error,
        failureCount,
        isError,
        isIdle,
        isSuccess,
        status,
        isPending,
    } = trpc.form.createForm.useMutation({
        onSuccess: async () => {
            await utils.form.invalidate();
        }
    });

    return {
        createForm,
        createFormAsync,
        error,
        failureCount,
        isError,
        isIdle,
        isSuccess,
        status,
        isPending,
    }
}

export const useListForms = () => {
    const {
        data: forms,
        error,
        isError,
        isLoading,
        isPending,
        status,
        refetch,
    } = trpc.form.listForms.useQuery(undefined, {
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    return {
        forms: forms ?? [],
        error,
        isError,
        isLoading,
        isPending,
        status,
        refetch,
    }
}
