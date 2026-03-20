export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  copyCount: number;
  createdAt: string;
  imageUrl?: string;
}

export const samplePrompts: Prompt[] = [
  {
    id: "1",
    title: "Cinematic Sci-Fi Cityscape",
    description: "Highly detailed futuristic cyberpunk city with neon reflections and volumetric fog.",
    content: "A photorealistic cinematic shot of a rainy neon cyberpunk alleyway in Tokyo, highly detailed reflections, glowing holograms, 8k resolution, Unreal Engine 5 render, ray tracing --ar 16:9",
    category: "Sci-Fi",
    tags: ["cyberpunk", "cityscape", "neon"],
    copyCount: 15450,
    createdAt: "2024-03-01T10:00:00Z",
    imageUrl: "https://images.unsplash.com/photo-1605364850558-29a3977c07e0?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "2",
    title: "Ethereal Portrait",
    description: "Soft lighting, ethereal beauty, perfect for editorial photography concepts.",
    content: "Medium format film photography portrait of an ethereal elven woman in a misty forest, soft glowing morning sunlight, bokeh, Hasselblad, highly detailed face --ar 4:5 --style raw",
    category: "Portraits",
    tags: ["portrait", "editorial", "fantasy"],
    copyCount: 12980,
    createdAt: "2024-03-02T12:00:00Z",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "3",
    title: "Minimalist Modern Architecture",
    description: "Clean lines and brutalist elements in a serene natural setting.",
    content: "Architectural photography of a minimalist brutalist glass house on a cliff overlooking the ocean at sunset, cinematic lighting, interior design, hyperrealistic --ar 16:9",
    category: "Architecture",
    tags: ["architecture", "minimalism", "modern"],
    copyCount: 8341,
    createdAt: "2024-03-03T09:30:00Z",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "4",
    title: "Studio Product Photography",
    description: "Clean, commercial-grade product photography prompt featuring dramatic lighting.",
    content: "High-end commercial photography of a sleek glass perfume bottle resting on black volcanic rock, splashing water drops, dramatic rim lighting, 8k, photorealistic --ar 1:1",
    category: "Product",
    tags: ["commercial", "lighting", "product"],
    copyCount: 11560,
    createdAt: "2024-03-04T15:00:00Z",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "5",
    title: "Studio Ghibli Anime Landscape",
    description: "Lush, painted anime landscape reminiscent of Hayao Miyazaki films.",
    content: "A lush green valley with an ancient magical windmill, fluffy white clouds, vibrant blue sky, Studio Ghibli style, Hayao Miyazaki, anime background art, highly detailed watercolor --ar 16:9",
    category: "Anime",
    tags: ["anime", "ghibli", "landscape"],
    copyCount: 18890,
    createdAt: "2024-03-05T08:15:00Z",
    imageUrl: "https://images.unsplash.com/photo-1542401886-65d6c61de007?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "6",
    title: "Deep Space Nebula",
    description: "Abstract, generative space art showing cosmic dust and vibrant colors.",
    content: "An ethereal glowing nebula in deep space shaped like a cosmic eye, brilliant purple and cyan hues, ultra high resolution, James Webb Telescope style, abstract generative art --ar 21:9",
    category: "Space",
    tags: ["space", "abstract", "stars"],
    copyCount: 13102,
    createdAt: "2024-03-06T11:45:00Z",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop"
  }
];

export const categories = [
  "Sci-Fi",
  "Portraits",
  "Architecture",
  "Product",
  "Anime",
  "Space",
  "Fantasy",
  "Abstract",
];
