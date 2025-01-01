export const getTime = (input: string | Date): string => {
    const createdAt = typeof input === "string" ? new Date(input) : input;
  
    const hours = createdAt.getHours().toString().padStart(2, '0'); // Menambahkan 0 jika jam kurang dari 10
    const minutes = createdAt.getMinutes().toString().padStart(2, '0'); // Menambahkan 0 jika menit kurang dari 10
  
    return `${hours}:${minutes}`;
  };