export function AddButton({name}) {
    return (
        <>
            <button
                type="submit"
                className="my-10 px-4 py-2 bg-[#17502E] text-white rounded-[10px] hover:bg-[#1A6D3B] w-[145px] h-[40px] flex items-center justify-center text-[15px] float-right">
                {name}
            </button>
        </>
    );
}