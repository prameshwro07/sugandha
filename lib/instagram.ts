export interface InstagramItem {
  id: number;
  type: "post" | "reel";
  image: string;
  url: string;
}

export const instagramItems: InstagramItem[] = [
  {
    id: 1,
    type: "post",
    image: "/instagram/post-1.jpg",
    url: "https://www.instagram.com/p/DbN89Z5iBuF/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 2,
    type: "reel",
    image: "/instagram/reel-1.jpg",
    url: "https://www.instagram.com/reel/REEL_LINK_1/",
  },
  {
    id: 3,
    type: "post",
    image: "/instagram/post-2.jpg",
    url: "https://www.instagram.com/p/POST_LINK_2/",
  },
  {
    id: 4,
    type: "reel",
    image: "/instagram/reel-2.jpg",
    url: "https://www.instagram.com/reel/REEL_LINK_2/",
  },
];
