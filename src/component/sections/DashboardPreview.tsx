interface DashboardPreviewProps {
  imageSrc: string;
  altText?: string;
}

export default function DashboardPreview({
  imageSrc,
  altText = "Dashboard preview",
}: DashboardPreviewProps) {
  return (
    <section className="relative bg-[#0C0C14] px-6 py-20 flex justify-center items-center">
      <div className="absolute w-[500px] h-[300px] blur-[100px] bg-white/10 rounded-full -z-10" />

      <div className="overflow-hidden rounded-xl border border-white/10 shadow-xl max-w-5xl w-full">
        <img
          src={imageSrc}
          alt={altText}
          className="w-full h-auto object-cover"
        />
      </div>
    </section>
  );
}
