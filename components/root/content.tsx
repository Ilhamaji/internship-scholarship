import { Image } from "@heroui/image";
import React from "react";

export default function content() {
  return (
    <div className="text-center">
      <div className="flex w-full items-center justify-center pt-8 md:pt-16 lg:px-24 xl:px-36">
        <div className="bg-[#09697E] mx-auto text-white text-center py-2 px-4 rounded-2xl text-sm">
          Tentang Beasiswa
        </div>
      </div>
      <div className="flex w-full items-center justify-center my-4 lg:px-24 xl:px-36">
        <div className="text-2xl md:text-4xl font-bold">Apa itu Beasiswa?</div>
      </div>
      <div className="flex flex-row w-full items-center justify-center lg:px-24 xl:px-36 text-sm md:text-base mb-8 md:mb-16">
        <div className="px-6">
          <p>
            Beasiswa adalah bentuk bantuan finansial yang diberikan kepada
            individu, baik pelajar maupun mahasiswa, sebagai dukungan untuk
            meringankan beban biaya pendidikan dan membantu mereka melanjutkan
            studi. Di Tiga Serangkai University, terdapat beberapa program
            beasiswa yang ditawarkan sebagai wujud komitmen perguruan tinggi
            dalam mendukung pemerataan akses pendidikan. Beberapa di antaranya
            adalah beasiswa KIP Kuliah, yang ditujukan bagi mahasiswa
            berprestasi dari keluarga kurang mampu, serta beasiswa Solo Peduli,
            yang berfokus pada pemberian bantuan bagi mahasiswa yang membutuhkan
            dukungan tambahan untuk menyelesaikan pendidikan mereka.
          </p>
        </div>
      </div>
      <div
        id="jenis-beasiswa"
        className="bg-neutral-100 dark:bg-neutral-900 w-full text-2xl md:text-4xl lg:text-6xl font-bold py-12 lg:px-24 xl:px-36"
      >
        <div className="px-6">
          Semangat kuliah bersama beasiswa di
          <span className="text-[#09697E]"> Tiga Serangkai University!</span>
        </div>
      </div>
      <div className="flex flex-col my-8 md:my-16 px-6 lg:px-24 xl:px-36">
        <div className="flex w-full items-center justify-center lg:px-24 xl:px-36">
          <div className="bg-[#09697E] mx-auto text-white text-center py-2 px-4 rounded-2xl text-sm mb-4">
            Jenis Beasiswa
          </div>
        </div>
        <div className="block md:grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center">
            <Image
              src={"/icon/hat.svg"}
              className="mx-auto w-28 md:w-32 lg:w-42"
            />
            <div className="text-center font-bold my-4 text-2xl md:text-4xl">
              Beasiswa KIP-K
            </div>
            <p className="text-sm md:text-base">
              Beasiswa KIP-K (Kartu Indonesia Pintar) Kuliah adalah bantuan
              biaya pendidikan dari pemerintah untuk mahasiswa yang memiliki
              potensi akademik baik tetapi berasal dari keluarga kurang mampu
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src={"/icon/hat.svg"}
              className="mx-auto w-28 md:w-32 lg:w-42"
            />
            <div className="text-center font-bold my-4 text-2xl md:text-4xl">
              Beasiswa Solo Peduli
            </div>
            <p className="text-sm md:text-base">
              Beasiswa Solo Peduli adalah bantuan pendidikan yang diberikan
              kepada anak-anak asuh Solo Peduli dan kepada pelajar
              maupun mahasiswa
            </p>
          </div>
        </div>
      </div>
      <div
        id="cara-mendaftar"
        className="flex flex-col w-full items-center justify-center bg-yellow-500 py-12 mt-8 md:mt-16 px-6 lg:px-24 xl:px-56"
      >
        <div className="bg-[#09697E] mx-auto text-white text-center py-2 px-4 rounded-2xl mb-4 text-sm">
          Cara Mendaftar Beasiswa
        </div>
        <Image src={"/img/urutan.svg"} className="px-6" />
        <div className="grid md:grid-cols-2 gap-4 mt-4 text-left text-sm md:text-base">
          <div className="flex flex-row gap-4 my-auto">
            <span className="my-auto font-bold">1.</span>
            <Image
              src={"/icon/alur-icon-1.svg"}
              className="w-12 rounded-none"
            />
            <span className="my-auto">
              Mahasiswa login untuk bisa mengisi laporan nya
            </span>
          </div>
          <div className="flex flex-row gap-4 my-auto">
            <span className="my-auto font-bold">2.</span>
            <Image
              src={"/icon/alur-icon-2.svg"}
              className="w-12 rounded-none"
            />
            <span className="my-auto">
              Mengisi laporan monev yang tersedia pada dashboard mahasiswa
            </span>
          </div>
          <div className="flex flex-row gap-4 my-auto">
            <span className="my-auto font-bold">3.</span>
            <Image
              src={"/icon/alur-icon-3.svg"}
              className="w-12 rounded-none"
            />
            <span className="my-auto">
              Menunggu laporan dievaluasi oleh dosen
            </span>
          </div>
          <div className="flex flex-row gap-4 my-auto">
            <span className="my-auto font-bold">4.</span>
            <Image
              src={"/icon/alur-icon-4.svg"}
              className="w-12 rounded-none"
            />
            <span className="my-auto">
              Mengecek status apakah beasiswa dilanjutkan atau tidak
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
