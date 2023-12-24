'use client'
import AdminHeader from "@/components/AdminHeader";
import ArticleBox from "@components/ArticleBox";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoadArticles = ({ articles }) => {
  return (
    <>
      {
        articles && articles.map((article) => {
          return (
            <ArticleBox key={article} image={"https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_1536,c_limit/d33b2a8b-f812-4f95-9c06-c544bf1c12c0/nike-athlete-marcus-rashford.jpg"} description={"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae, recusandae fsfsgs  gsg reh eh eth th."} tag={"Tag"} title={"Title"} id={1234}/>
          )
        })
      }
      <ArticleBox />
      <ArticleBox />
      <ArticleBox />
    </>
  )
}

const AdminPanel = () => {

  const router = useRouter();
  const arr = [1,2,3,4,5];

  // useEffect(() => {
  //   const isAdmin = localStorage.getItem('admin');
  //   console.log(isAdmin);
  //   if (isAdmin === null) {
  //     router.push('/login');
  //   }
  // }, []);

  const checkLogin = () => {
    if(!localStorage.getItem('admin')) {
      router.push('/login');
    }
    return;
  }

  function handleAddNewArticle() {
    router.push("/addnewarticle");
  }

  checkLogin();

  return (
    <>
      <AdminHeader />
      <button
        type="button"
        className="border border-gray-400 rounded-md p-2 m-5 hover:bg-gray-100"
        onClick={handleAddNewArticle}
      >
        <span>
          <AddIcon fontSize="small" />
        </span>
        Add new article
      </button>
      <div className="w-full flex justify-center pt-4 pb-6">
        <span className="text-4xl font-bold">Explore Articles</span>
      </div>

      <div className="flex flex-wrap justify-around">
        <LoadArticles articles={arr} />
      </div>
      
    </>
  );
};

export default AdminPanel;
