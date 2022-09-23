
import reducer, {
  initialState,
  getAllPosts,
  addNewPost,
  deletePost
} from "../../../redux/features/posts/postsSlice";
import  {
  login
} from "../../../redux/features/auth/authSlice";
import {store} from "../../../redux/store"

let token = ''
let lastPostID = ''

describe("Get all posts", () => {
  beforeAll( async ()  => {
  
    const result = await store.dispatch(login({email: "hugo@yahoo.fr", password:"azeaze"}))
    token = result.payload.token
  })

  it("Should create a new post", async () => {
    const newContent = "this is a content used to build a test where the user adds a post."
    const formData = new FormData();
    formData.append("post[content]", newContent);
    formData.append("post[has_to_be_displayed]", false);   
    const result = await store.dispatch(addNewPost({ newPost:formData, token:token })).unwrap()
    const lastPost = result.posts
    lastPostID = lastPost.id
    expect(lastPost.content).toBe(newContent)
  }, 50000)
  

  it("Should return a list of posts, including the new post", async () => {
    const result = await store.dispatch(getAllPosts({ page: 1, token:token }))
    expect(result.type).toBe("posts/getAllPosts/fulfilled");
    const lastPost = result.payload[0]
    expect(lastPost.id).toBe(lastPostID)
  })

  it("Should delete the new post", async () => {
    const result = await store.dispatch(deletePost({ id: lastPostID }))
    expect(result.type).toBe("posts/deletePost/fulfilled");
    expect(result.payload.id).toBe(lastPostID);
  })

  it("Should return a list of posts, excluding the new post ", async () => {
    const result = await store.dispatch(getAllPosts({ page: 1, token:token }))
    expect(result.type).toBe("posts/getAllPosts/fulfilled");
    const lastPost = result.payload[0]
    expect(lastPost.id).not.toBe(lastPostID)
  })
})

