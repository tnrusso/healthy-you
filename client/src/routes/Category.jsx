import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ArticleAPI from '../apis/ArticleAPI';
import { ListGroup, Container, Row } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';
import ArticleComponent from '../components/ArticleComponent';
import TopNavBar from '../components/TopNavBar';

const ArticleCategory = (props) => {
    let { id } = useParams();

    const [articles, setArticles] = useState([]);

    // const [headlineList, setHeadlineList] = useState([]);
    // const [categoryList, setCategoryList] = useState([]);
    // const [summaryList, setSummaryList] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ArticleAPI.post("/category", {
                    category: id
                })

                console.log("response:", response.data.data)
                // const articleJson = response.data.data;
                // const jsonLength = Object.keys(articleJson).length;

                // for(var i = 0; i < jsonLength; i++){
                //     setHeadlineList( prevArray => [...prevArray, articleJson[i].headline])
                //     setCategoryList( prevArray => [...prevArray, articleJson[i].category]) 
                //     setSummaryList( prevArray => [...prevArray, articleJson[i].summary]) 
                // }
                setArticles(response.data.data)

            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, []);

    // const getAuthorName = async (writer_id) => {
    //     console.log("RUNNING AUTHOR");
    //     console.log(writer_id)
    //     try {
    //         const response = await ArticleAPI.post("/find", {
    //             writer_id: writer_id
    //         })

    //         console.log("response:", response.data.data)
    //         setArticles(response.data.data)

    //     } catch (error) {
    //         console.log(error)
    //     }
    // };

    return (
        <>
        <TopNavBar />
        <Container>
            <div align="center">
                <h1>{id} </h1>
            </div>
            <br />


            {articles.map((article) => {

                return (
                    <>
                    <hr />
                    <Row>
                        <ArticleComponent article={article} writer="Anonymous Writer" type="horizontal" />
                        {/* {getAuthorName(article.writer_id)} */}
                    </Row>
                    </>
                )

            })}

        </Container>
        </>
    )
}

export default ArticleCategory;