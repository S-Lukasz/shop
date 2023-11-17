export default function ProductPage({ params }: { params: { id: string } }) {
  useEffect(() => {
    const initialFetch = async () => {
      const result = await fetch("https://fakestoreapi.com/products/1");
      const product = result.json();
    };

    initialFetch();
  }, []);

  return (
    <div className=" mb-10 flex h-full w-full flex-col items-center">
      <div className="flex w-full gap-2 rounded-lg bg-white p-6 pl-4 shadow-md ">
        <p className=" m-auto line-clamp-1 h-[1lh] text-xl font-semibold">
          Item ID:{params.id}
        </p>
      </div>
    </div>
  );
}
