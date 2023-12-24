'use client'
import { useRouter } from "next/navigation";

const ArticleBox = ({ image, tag, title, description, id }) => {

  if (image == undefined) {
    return <div className="w-[28%] h-96 object-contain"></div>;
  }

  const router = useRouter();
  
  const handleArticleBoxClick = (e) => {
    router.push(`/article/${id}`);
  }

  return (
    <>
      <div className="w-[28%] h-96 object-contain cursor-pointer" onClick={handleArticleBoxClick}>
        <img src={image} alt="article-img" className="w-full h-[60%]" />
        <span className="text-gray-500">{tag}</span>
        <div className="mt-2">
          <span className="font-semibold text-xl">{title}</span>
        </div>
        <div>
          <div>
            <span>{description.length <= 110 ? description : description.substring(0, 110)+"..."}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleBox;
