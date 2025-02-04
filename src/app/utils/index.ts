export const DEFAULTIMAGE = 'assets/images/default-pet-image.webp';

export function padTime(time: number): string {
  return time < 10 ? `0${time}` : `${time}`;
}

export function calculateTimeLeft(midnight: number): string {
    const timeDiff = midnight - Date.now();
  
    if (timeDiff <= 0) {
      return '00:00:00';
    }
  
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDiff / 1000) % 60);
  
    return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
}  