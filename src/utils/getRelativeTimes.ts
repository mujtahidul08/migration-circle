export const getRelativeTime = (input: string | Date): string => {
    const createdAt = typeof input === "string" ? new Date(input) : input;
    const now = new Date();
    const diffInMs = now.getTime() - createdAt.getTime();
  
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    if (diffInHours < 24) return `${diffInHours}h`;
  
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d`;
  
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}w`;
  };