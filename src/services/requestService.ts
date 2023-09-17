const backendUrl = import.meta.env.VITE_PROD_BACKEND_URL;

export async function fetchMatchByPage(page: number) {
    const response = await fetch(`${backendUrl}match-v5/page/${page}`);
    return await response.json();
}
