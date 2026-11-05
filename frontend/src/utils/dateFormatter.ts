export const formatDate = (dateString?: string | Date | null): string => {
    if (!dateString) return "";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

export const formatDateTime = (dateString?: string | Date | null) => {
    if (!dateString) return { date: "-", time: "" };
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return { date: "-", time: "" };
    return {
        date: d.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }),
        time: d.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        }),
    };
};
