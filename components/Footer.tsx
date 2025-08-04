export default function Footer() {
  return (
    <div className="">
      <div className="block md:grid md:grid-cols-4 bg-[#F5F5F5] dark:bg-neutral-900 gap-4 py-6 px-6 xl:px-36">
        <div className="flex flex-col gap-4 text-center md:text-left md:basis-1/4">
          <img src="/icon/logo.svg" className="w-40 mx-auto md:mx-0" alt="" />
          <div className="text-sm md:text-base">
            Jl K.H Samanhudi No.84-86, Purwosari, Kec. Laweyan, Kota Surakarta,
            Jawa Tengah 57149
          </div>
          <div className="flex flex-row mx-auto md:mx-0 gap-4 w-full mb-4 md:mb-0 justify-center md:justify-start">
            <img src="/icon/instagram.svg" className="w-6" alt="" />
            <img src="/icon/tik-tok.svg" className="w-6" alt="" />
            <img src="/icon/youtube.svg" className="w-6" alt="" />
          </div>
        </div>
        <div className=""></div>
        <div className="col-span-2 text-sm md:text-base">
          <div className="grid grid-cols-3 gap-4">
            <div className="">
              <div className="font-bold text-2xl">Links</div>
              <div className="flex h-auto">
                <div className="flex flex-col gap-1 pt-4">
                  <a href="#">Tentang Beasiswa</a>
                  <a href="#">Panduan Penggunaan</a>
                  <a href="#">Syarat & Ketentuan</a>
                  <a href="#">Kebijakan Privasi</a>
                </div>
              </div>
            </div>
            <div className="">
              <div className="font-bold text-2xl">About Us</div>
              <div className="flex h-auto">
                <div className="flex flex-col gap-1 pt-4">
                  <a href="#">Tiga Serangkai University</a>
                </div>
              </div>
            </div>
            <div className="">
              <div className="font-bold text-2xl">Contact</div>
              <div className="flex flex-col gap-1 pt-4">
                <a href="#">(0271) 716500</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#09697E] w-full">
        <span className="text-white text-center py-4 px-4 block w-full text-sm md:text-base">
          &copy; 2025 Tiga Serangkai University. All rights reserved.
        </span>
      </div>
    </div>
  );
}
