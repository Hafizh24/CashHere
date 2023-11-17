import { Skeleton } from "@chakra-ui/react";
import Card from "../card";

export default function PaginatedProduct({productData, getProducts, isLoaded, currentPage, postsPerPage}){
    
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = productData.slice(indexOfFirstPost, indexOfLastPost);

    return(
        <>
        {currentPosts.map((item) =>(
            <>
            {item.isActive === true ? 
            <>
                <Skeleton isLoaded={isLoaded} fadeDuration={1}>
                    <Card productData={item} getProducts={getProducts}/>
                </Skeleton>
            </> 
            : 
            <>                            
            </>}
            </>
        ))}
        </>
    )
}