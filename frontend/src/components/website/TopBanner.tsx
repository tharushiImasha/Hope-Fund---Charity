export function TopBanner({ title, breadcrumb, image }) {
    return (
        <>
            <div
                className="relative h-80 bg-cover bg-center flex items-center justify-center text-white text-center"
                style={{ backgroundImage: `url(${image})` }}
            >
                <div className="relative z-10">
                    <h2 className="text-4xl font-bold">{title}</h2>
                    <p className="text-lg mt-2">Home &gt; {breadcrumb}</p>
                </div>
            </div>
        </>
    );
}
