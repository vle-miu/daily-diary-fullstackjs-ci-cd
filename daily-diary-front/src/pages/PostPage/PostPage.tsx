import { Box, Card, CardContent, CardHeader, Container } from "@mui/material";
import PostListItem from "../../components/Post/PostListItem/PostListItem";
import DateButtonGroup from "../../components/Post/DateButtonGroup/DateButtonGroup";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../contexts/PostsContext";
import { PostService } from "../../services/post/postService";
import { convertDateToFormat } from "../../utils/utils";
import { Post } from "../../models/Post";
import { CustomError } from "../../utils/customError";
import { isToday } from "date-fns";

export default function PostPage() {
    const postService = new PostService();
    const {
        posts,
        searchDate,
        isVoted,
        isAddedNew,
        updatePosts,
        updateLoading,
        updateNotify,
    } = useContext(GlobalContext);

    useEffect(() => {
        fetchPosts();
    }, [searchDate, isVoted, isAddedNew]);

    const fetchPosts = async () => {
        updateLoading(true);
        try {
            const posts: Post[] = await postService.getAllPosts(
                convertDateToFormat(searchDate, "MM-dd-yyyy")
            );
            updatePosts(posts);
            updateLoading(false);
        } catch (error) {
            let errorMsg: string = "Unknow error!";
            if (error instanceof CustomError) {
                errorMsg = error.message;
            }

            updateLoading(false);
            updateNotify({
                status: "error",
                message: errorMsg,
            });
        }
    };

    return (
        <Container maxWidth="xl">
            <Card variant="outlined" sx={{ m: 2, p: 2 }}>
                <CardHeader
                    title={`List Posts (${
                        isToday(searchDate)
                            ? "Today"
                            : searchDate.toLocaleDateString()
                    })`}
                />
                <CardContent>
                    <DateButtonGroup />
                    {posts.length > 0 ? (
                        <PostListItem />
                    ) : (
                        <Card variant="outlined" sx={{ mt: 4, mb: 4 }}>
                            <CardContent>There is no posts</CardContent>
                        </Card>
                    )}
                    <DateButtonGroup />
                </CardContent>
            </Card>
        </Container>
    );
}
