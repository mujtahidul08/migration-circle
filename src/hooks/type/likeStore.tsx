import { create } from "zustand";

type Post = {
  name: string;
  username: string;
  postedAt: string;
  isLike: boolean;
  avatar: string;
  content: string;
  image: string;
  likes: number;
  replies: number;
};

type LikeStore = {
  posts: Post[];
  toggleLike: (index: number) => void;
};

const useLikeStore = create<LikeStore>((set) => ({
  posts: [
    {
        name : "Muhammad Fakhri",
        username:"@fakhriozora",
        postedAt:"10 h",
        isLike:true,
        avatar:"https://cdn1-production-images-kly.akamaized.net/wpuyou3Kvn3-plIkWnjIat2eG8w=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/1765972/original/080021100_1510286019-Featured-2-696x476.jpg",
        content:"Kalian pernah ga sih bet on saving? Jadi by calculation sebenernya kita ga survive sampe tanggal tertentu. Tapi entah gimana bisa aja gitu. Ada aja jalannya augmented reality real time puppet I made. You can try it now went below in the thread.",
        image:"",
        likes: 125,
        replies:27
    },
    {
        name : "Anita Yunita",
        username:"@anityunit",
        postedAt:"17 h",
        isLike:false,
        avatar:"https://wallpaper.forfun.com/fetch/cc/cc2dab4964851ab080e152fe364fca04.jpeg",
        content:"Pernah nggak dapet dream job terus lama-lama ngerasa lah kok tidak seperti yang diharapkan (atau simply lelah) terus fall out of love dengan job/bidang tsb?",
        image:"https://bit.ly/naruto-sage",
        likes: 302,
        replies:47
    },
    {
        name : "Kucing Cat",
        username:"@catcat",
        postedAt:"29 jul",
        isLike:true,
        avatar:"https://wallpaper.forfun.com/fetch/cc/cc2dab4964851ab080e152fe364fca04.jpeg",
        content:"Dibanding rekan2 media menginterview saya terkait issue yg lg ramai, ada baiknya mending interview instansi yg ngasih izin, BKSDA dll, manfaatkan moment untuk mendorong regulasi nya jadi lebih ketat. Ketua mpr kita pak Bamsut juga pelihara singa, ga mau push berita ini aja?",
        image:"",
        likes: 900,
        replies:12
    },
    {
        name : "Kucing Cat",
        username:"@catcat",
        postedAt:"29 jul",
        isLike:true,
        avatar:"https://wallpaper.forfun.com/fetch/cc/cc2dab4964851ab080e152fe364fca04.jpeg",
        content:"H-2 menuju Pengumuman Hasil Seleksi Jalur SNBT 2024! Makin degdegan atau malah gak sabar nih nunggu pengumumannya? Yuk tulis harapan kamu untuk tanggal 13 Juni 2024 nanti di kolom komentar yaa!",
        image:"",
        likes: 900,
        replies:12
    },
    {
        name : "Kucing Cat",
        username:"@catcat",
        postedAt:"29 jul",
        isLike:false,
        avatar:"https://wallpaper.forfun.com/fetch/cc/cc2dab4964851ab080e152fe364fca04.jpeg",
        content:"Kabar baik menjadi pelipur lara di tengah kondisi saat ini. Tak henti bersyukur adalah salah satu cara kami memaknai pencapaian ini.Semoga prestasi lain tak menjadikan kami tinggi hati dan selalu sedia memperbaiki diri. Yuk semangat",
        image:"",
        likes: 900,
        replies:12
    },
    {
        name : "Kucing Cat",
        username:"@catcat",
        postedAt:"29 jul",
        isLike:false,
        avatar:"https://wallpaper.forfun.com/fetch/cc/cc2dab4964851ab080e152fe364fca04.jpeg",
        content:"Hujan-hujan nyruput sup timlo Jgn lupa taburkan ebi Tak usah galau statusmu jomblo Biar hayati tak lelah lagi Sendiri bukanlah sepi Itu prinsip matangkan diri Hingga ijazah menghampiri Kampus ini menjadi saksi",
        image:"",
        likes: 900,
        replies:12
    }
  ],
  toggleLike: (index) =>
    set((state) => {
      const updatedPosts = [...state.posts];
      updatedPosts[index].isLike = !updatedPosts[index].isLike;
      updatedPosts[index].likes += updatedPosts[index].isLike ? 1 : -1;
      return { posts: updatedPosts };
    }),
}));

export default useLikeStore;
