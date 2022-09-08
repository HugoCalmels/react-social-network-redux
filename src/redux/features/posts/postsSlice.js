import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN;
// original tuto comes with : https://jsonplaceholder.typicode.com/
// http://localhost:3000/api/v1/posts

const initialState = {
  posts: [],
  currentPost: "",
  updateStatus: "idle",
  status: "idle", // differents value : 'iddle' | 'loading' |'succeeded' | 'failed'
  error: null,
  last: "",
  images: [],
  imagesStatus: "idle",
  pageStatus: "idle",
  changePostStatus: "idle",
  newEntryStatus: "idle",
};

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (payload) => {
    const config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("auth-token")}`,
      },
      body: payload,
    };
    let response = [];
    let data = [];
    try {
      response = await fetch(`${BASE_URL}/api/v1/posts`, config);
      data = await response.json();
    } catch (e) {
      console.log(e);
    }

    //
    const config2 = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth-token")}`,
      },
    };
    let latestPost = [];
    let dataLatestPost = [];
    try {
      latestPost = await fetch(`${BASE_URL}/api/v1/latest`, config2);
      dataLatestPost = await latestPost.json();
    } catch (e) {
      console.log(e);
    }

    const author = JSON.parse(Cookies.get("user"));
    const newPost = {
      id: dataLatestPost.id,
      user_id: dataLatestPost.user_id,
      content: dataLatestPost.content,
      author: author.name,
      image_link: dataLatestPost.image_url,
      has_to_be_displayed: dataLatestPost.has_to_be_displayed,
    };
    const configNewPost = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth-token")}`,
      },
      body: JSON.stringify(newPost),
    };

    let responseNewPost = [];
    let dataNewPost = [];
    try {
      responseNewPost = await fetch(
        `${BASE_URL}/api/v1/posts/${dataLatestPost.id}`,
        configNewPost
      );
      dataNewPost = await responseNewPost.json();
    } catch (e) {}

    const config3 = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth-token")}`,
      },
    };

    let response3 = [];
    let data3 = [];
    try {
      response3 = await fetch(
        `${BASE_URL}/api/v1/posts/${dataLatestPost.id}`,
        config3
      );
      data3 = await response3.json();
    } catch (e) {
      console.log(e);
    }

    // create a post actually
    const newPost2 = {
      user_id: author.id,
      link: dataLatestPost.image_url,
    };
    const config4 = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth-token")}`,
      },
      body: JSON.stringify(newPost2),
    };

    let response4 = [];
    let data4 = [];
    try {
      response4 = await fetch(`${BASE_URL}/api/v1/post_images`, config4);
      data4 = await response4.json();
    } catch (e) {
      console.log(e);
    }

    // return post here

    const config5 = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth-token")}`,
      },
    };

    let response5 = [];
    let data5 = [];
    try {
      response5 = await fetch(
        `${BASE_URL}/api/v1/getAllPostImagesFromUser`,
        config5
      );
      data5 = await response5.json();
    } catch (e) {}

    return { posts: data3, imgs: data5 };
  }
);

export const getAllPostsFromSelectUser = createAsyncThunk(
  "posts/getAllPostsFromSelectUser",
  async (payload) => {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth-token")}`,
      },
    };
    const response = await fetch(
      `${BASE_URL}/api/v1/posts/getOnlySelectedUserPosts/page/${payload.page}/${payload.username}`,
      config
    );
    const data = await response.json();

    return data;
  }
);

export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (payload) => {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth-token")}`,
      },
    };
    const response = await fetch(
      `${BASE_URL}/api/v1/posts/page/${payload.page}`,
      config
    );
    const data = await response.json();

    return data;
  }
);

export const getAgainAllPosts = createAsyncThunk(
  "posts/getAgainAllPosts",
  async (payload) => {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth-token")}`,
      },
    };
    const response = await fetch(
      `${BASE_URL}/api/v1/posts/page/${payload.page}`,
      config
    );
    const data = await response.json();

    return data;
  }
);

export const getNextPageFromSelectedUser = createAsyncThunk(
  "posts/getNextPageFromSelectedUser",
  async (payload) => {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth-token")}`,
      },
    };
    const response = await fetch(
      `${BASE_URL}/api/v1/posts/getOnlySelectedUserPosts/page/${payload.page}/${payload.username}`,
      config
    );
    const data = await response.json();

    return data;
  }
);

export const getNextPage = createAsyncThunk(
  "posts/getNextPage",
  async (payload) => {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth-token")}`,
      },
    };
    const response = await fetch(
      `${BASE_URL}/api/v1/posts/page/${payload.page}`,
      config
    );
    const data = await response.json();

    return data;
  }
);

export const getAllPostsFromSelectedUser = createAsyncThunk(
  "posts/getAllPostsFromSelectedUser",
  async (payload) => {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth-token")}`,
      },
    };
    const response = await fetch(
      `${BASE_URL}/api/v1/posts/getOnlySelectedUserPosts/page/${payload.page}/${payload.username}`,
      config
    );
    const data = await response.json();

    return data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (payload) => {
    const config = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth-token")}`,
      },
    };
    const response = await fetch(
      `${BASE_URL}/api/v1/posts/${payload.id}`,
      config
    );
    const data = await response.json();

    const config5 = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth-token")}`,
      },
    };

    let response5 = [];
    let data5 = [];
    try {
      response5 = await fetch(
        `${BASE_URL}/api/v1/getAllPostImagesFromUser`,
        config5
      );
      data5 = await response5.json();
    } catch (e) {}

    return { id: payload.id, imgs: data5 };
  }
);

export const deleteLastPost = createAsyncThunk(
  "posts/deleteLastPost",
  async (payload) => {
    // remove the post that were created to get the image_url
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth-token")}`,
      },
    };
    let response = [];
    let data = [];
    try {
      response = await fetch(`${BASE_URL}/api/v1/deleteLastPost`, config);
      data = await response.json();
    } catch (e) {
      console.log(e);
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (payload) => {
    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth-token")}`,
      },
      body: JSON.stringify(payload),
    };

    const response = await fetch(
      `${BASE_URL}/api/v1/posts/${payload.id}`,
      config
    );
    const data = await response.json();
    const config2 = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth-token")}`,
      },
    };
    const response2 = await fetch(
      `${BASE_URL}/api/v1/posts/${payload.id}`,
      config2
    );
    const data2 = await response2.json();

    return data2;
  }
);

export const updatePostAndImage = createAsyncThunk(
  "posts/updatePostAndImage",
  async (payload) => {
    const config = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${Cookies.get("auth-token")}`,
      },
      body: payload.post,
    };
    const response = await fetch(
      `${BASE_URL}/api/v1/posts/${payload.id}`,
      config
    );
    const data = await response.json();

    // get last image
    const latestPost = await fetch(`${BASE_URL}/api/v1/latest`);
    const dataLatestPost = await latestPost.json();

    const newPost = {
      id: dataLatestPost.id,
      user_id: dataLatestPost.user_id,
      content: dataLatestPost.content,
      author: dataLatestPost.author,
      image_link: dataLatestPost.image_url,
      has_to_be_displayed: dataLatestPost.has_to_be_displayed,
    };

    const configNewPost = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth-token")}`,
      },
      body: JSON.stringify(newPost),
    };
    const responseNewPost = await fetch(
      `${BASE_URL}/api/v1/posts/${dataLatestPost.id}`,
      configNewPost
    );
    const dataNewPost = await responseNewPost.json();

    const config3 = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth-token")}`,
      },
    };

    const response3 = await fetch(
      `${BASE_URL}/api/v1/posts/${dataLatestPost.id}`,
      config3
    );
    const data3 = await response3.json();

    return data3;
  }
);

// UPDATE POST METHOD 3
export const updatePostAndImageAnyButLast = createAsyncThunk(
  "posts/updatePostAndImageAnyButLast",
  async (payload) => {
    // create the image file
    const config1 = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("auth-token")}`,
      },
      body: payload.post,
    };
    try {
      const res = await fetch(`${BASE_URL}/api/v1/posts`, config1);
    } catch (e) {
      console.log(e);
    }

    // get the image file url
    const config2 = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth-token")}`,
      },
    };
    let response2 = [];
    let data2 = [];
    try {
      response2 = await fetch(`${BASE_URL}/api/v1/latest`, config2);
      data2 = await response2.json();
    } catch (e) {
      console.log(e);
    }

    // delete old post

    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth-token")}`,
      },
    };
    let response = [];
    let data = [];
    try {
      response = await fetch(`${BASE_URL}/api/v1/removePostDisplay`, config);
      data = await response.json();
    } catch (e) {
      console.log(e);
    }

    // update the initial post with the url
    const updatedPost = {
      id: payload.id, // grabbing the initial post id
      user_id: data2.user_id,
      content: data2.content,
      author: data2.author,
      image_link: data2.image_url,
      has_to_be_displayed: data2.has_to_be_displayed,
    };
    const config3 = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth-token")}`,
      },
      body: JSON.stringify(updatedPost),
    };
    try {
      await fetch(`${BASE_URL}/api/v1/posts/${payload.id}`, config3);
    } catch (e) {
      console.log(e);
    }

    // get the initial post, with updated image_link
    const config4 = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth-token")}`,
      },
    };
    let response4 = [];
    let data4 = [];
    try {
      response4 = await fetch(
        `${BASE_URL}/api/v1/posts/${payload.id}`,
        config4
      );
      data4 = await response4.json();
    } catch (e) {
      console.log(e);
    }
    return data4;
  }
);

// comments are here for now, as they belongs to posts
export const addNewComment = createAsyncThunk(
  "posts/addNewComment",
  async (payload) => {
    const commentDetails = {
      comment: {
        content: payload.content,
        post_id: payload.postId,
      },
    };

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth-token")}`,
      },
      body: JSON.stringify(commentDetails),
    };
    const response = await fetch(
      `${BASE_URL}/api/v1/posts/${payload.postId}/comments`,
      config
    );
    const data = await response.json();
    return data;
  }
);

export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async (payload) => {
    const config = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth-token")}`,
      },
    };

    const response = await fetch(
      `${BASE_URL}/api/v1/posts/${payload.post.id}/comments/${payload.comment_id}`,
      config
    );

    const data = await response.json();
    console.log("DATA AFTER DESTROY COMMENT");
    console.log("DATA AFTER DESTROY COMMENT");
    console.log("DATA AFTER DESTROY COMMENT");
    console.log(data);
    console.log("DATA AFTER DESTROY COMMENT");
    console.log("DATA AFTER DESTROY COMMENT");
    return data;
  }
);

export const updateComment = createAsyncThunk(
  "posts/updateComment",
  async (payload) => {
    const commentDetails = {
      comment: {
        content: payload.comment_content,
      },
    };

    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth-token")}`,
      },
      body: JSON.stringify(commentDetails),
    };
    const response = await fetch(
      `${BASE_URL}/api/v1/posts/${payload.post.id}/comments/${payload.comment_id}`,
      config
    );
    const data = await response.json();
    return data;
  }
);

export const addNewLike = createAsyncThunk(
  "posts/addNewLike",
  async (payload) => {
    const likeDetails = {
      like: {
        user_id: payload.userId,
        post_id: payload.post.id,
      },
    };

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth-token")}`,
      },
      body: JSON.stringify(likeDetails),
    };
    const response = await fetch(
      `${BASE_URL}/api/v1/posts/${payload.post.id}/likes`,
      config
    );
    const data = await response.json();

    return data;
  }
);

export const removeLike = createAsyncThunk(
  "posts/removeLike",
  async (payload) => {
    const config = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth-token")}`,
      },
    };

    const response = await fetch(
      `${BASE_URL}/api/v1/posts/${payload.post.id}/likes/${payload.like_id}`,
      config
    );

    const data = await response.json();

    //return { commentId: payload.comment_id, postId: payload.post.id }
    // actually i'll fetch another time to get last post infos...

    const response2 = await fetch(
      `${BASE_URL}/api/v1/posts/${payload.post.id}`
    );
    const data2 = response2.json();
    return data2;
  }
);

export const getAllImagesPostsFromUser = createAsyncThunk(
  "posts/getAllImagesPostsFromUser",
  async (payload) => {
    const config4 = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth-token")}`,
      },
    };
    let response4 = [];
    let data4 = [];
    try {
      response4 = await fetch(
        `${BASE_URL}/api/v1/getAllPostImagesFromUser`,
        config4
      );
      data4 = await response4.json();
    } catch (e) {
      console.log(e);
    }

    return data4;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = "succeeded";
      })
      .addCase(getAllPostsFromSelectUser.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getAllPostsFromSelectUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllPostsFromSelectUser.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = "succeeded";
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getNextPage.pending, (state, action) => {
        state.pageStatus = "loading";
      })
      .addCase(getNextPage.fulfilled, (state, action) => {
        const posts = state.posts;
        const concatPosts = posts.concat(action.payload);
        const filteredPosts = concatPosts.filter(
          (value, index, self) =>
            self.findIndex((v) => v.id === value.id) === index
        );
        state.posts = filteredPosts;

        state.pageStatus = "succeeded";
      })
      .addCase(getNextPage.rejected, (state, action) => {
        state.pageStatus = "failed";
      })
      .addCase(getNextPageFromSelectedUser.pending, (state, action) => {
        state.pageStatus = "loading";
      })
      .addCase(getNextPageFromSelectedUser.fulfilled, (state, action) => {
        const posts = state.posts;
        const concatPosts = posts.concat(action.payload);
        const filteredPosts = concatPosts.filter(
          (value, index, self) =>
            self.findIndex((v) => v.id === value.id) === index
        );
        state.posts = filteredPosts;

        state.pageStatus = "succeeded";
      })
      .addCase(getNextPageFromSelectedUser.rejected, (state, action) => {
        state.pageStatus = "failed";
      })
      .addCase(getAgainAllPosts.pending, (state, action) => {
        state.newEntryStatus = "loading";
      })
      .addCase(getAgainAllPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.newEntryStatus = "succeeded";
      })
      .addCase(getAgainAllPosts.rejected, (state, action) => {
        state.newEntryStatus = "failed";
      })

      .addCase(getAllPostsFromSelectedUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllPostsFromSelectedUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(getAllPostsFromSelectedUser.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(addNewPost.pending, (state, action) => {
        state.changePostStatus = "loading";
        state.imagesStatus = "loading";
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload.posts);
        state.images = action.payload.imgs;
        state.changePostStatus = "succeeded";
        state.imagesStatus = "succeeded";
      })
      .addCase(addNewPost.rejected, (state, action) => {
        state.changePostStatus = "failed";
        state.imagesStatus = "failed";
      })
      .addCase(deletePost.pending, (state, action) => {
        state.status = "loading";
        state.imagesStatus = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const posts = state.posts.filter(
          (post) => post.id !== action.payload.id
        );
        state.posts = posts;
        state.images = action.payload.imgs;
        state.status = "succeeded";
        state.imagesStatus = "succeeded";
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.imagesStatus = "failed";
      })
      .addCase(deleteLastPost.fulfilled, (state, action) => {
        const posts = state.posts.filter((post) => post.id !== action.payload);
        state.posts = posts;
      })

      .addCase(updatePost.pending, (state, action) => {
        state.updateStatus = "loading";
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        console.log("ADDCASEUPDATE");
        console.log(action.payload);
        console.log("ADDCASEUPDATE");
        const posts = state.posts.filter(
          (post) => post.id !== action.payload.id
        );
        state.posts = [...posts, action.payload];
        //state.status = 'succeeded'
        state.currentPost = action.payload;
        state.updateStatus = "succeeded";
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.updateStatus = "failed";
      })
      // update post with image
      .addCase(updatePostAndImage.pending, (state, action) => {
        state.updateStatus = "loading";
      })
      .addCase(updatePostAndImage.fulfilled, (state, action) => {
        const posts = state.posts.filter(
          (post) => post.id !== action.payload.id
        );
        state.posts = [...posts, action.payload];
        //state.status = 'succeeded'
        state.currentPost = action.payload;
        state.updateStatus = "succeeded";
      })
      .addCase(updatePostAndImage.rejected, (state, action) => {
        state.updateStatus = "failed";
      })
      .addCase(updatePostAndImageAnyButLast.pending, (state, action) => {
        state.updateStatus = "loading";
      })
      .addCase(updatePostAndImageAnyButLast.fulfilled, (state, action) => {
        const posts = state.posts.filter(
          (post) => post.id !== action.payload.id
        );
        state.posts = [...posts, action.payload];
        //state.status = 'succeeded'
        state.currentPost = action.payload;
        state.updateStatus = "succeeded";
      })
      .addCase(updatePostAndImageAnyButLast.rejected, (state, action) => {
        state.updateStatus = "failed";
      })

      // comments

      .addCase(addNewComment.pending, (state, action) => {
        //state.status = "loading"
        state.updateStatus = "loading";
      })

      .addCase(addNewComment.fulfilled, (state, action) => {
        const posts = state.posts.filter(
          (post) => post.id !== action.payload.id
        );
        //const post = state.posts.filter(post => post.id === action.payload.post_id)

        state.posts = [...posts, action.payload]; //comments.push(action.payload.post)
        // idk how i'll change the post object to add the comments yet
        //state.status = "succeeded" // will remove this

        // other state here
        state.currentPost = action.payload;
        state.updateStatus = "succeeded";
      })

      .addCase(addNewComment.rejected, (state, action) => {
        //state.status = "failed"
        state.updateStatus = "failed";
      })

      // delete comments
      .addCase(deleteComment.pending, (state, action) => {
        state.updateStatus = "loading";
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const posts = state.posts.filter(
          (post) => post.id !== action.payload.id
        );
        state.posts = [...posts, action.payload];
        state.currentPost = action.payload;
        state.updateStatus = "succeeded";
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.updateStatus = "failed";
      })

      // update comment
      .addCase(updateComment.pending, (state, action) => {
        state.updateStatus = "loading";
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const posts = state.posts.filter(
          (post) => post.id !== action.payload.id
        );
        state.posts = [...posts, action.payload]; //comments.push(action.payload.post)
        state.currentPost = action.payload;
        state.updateStatus = "succeeded";
      })

      .addCase(updateComment.rejected, (state, action) => {
        //state.status = "failed"
        state.updateStatus = "failed";
      })

      // add new like
      .addCase(addNewLike.pending, (state, action) => {
        state.currentPost = action.payload;
        state.updateStatus = "loading";
      })
      .addCase(addNewLike.fulfilled, (state, action) => {
        const posts = state.posts.filter(
          (post) => post.id !== action.payload.id
        );
        state.posts = [...posts, action.payload];
        state.currentPost = action.payload;
        state.updateStatus = "succeeded";
      })
      .addCase(addNewLike.rejected, (state, action) => {
        state.updateStatus = "failed";
      })

      .addCase(removeLike.pending, (state, action) => {
        state.updateStatus = "loading";
      })
      .addCase(removeLike.fulfilled, (state, action) => {
        const posts = state.posts.filter(
          (post) => post.id !== action.payload.id
        );
        state.posts = [...posts, action.payload];
        state.currentPost = action.payload;
        state.updateStatus = "succeeded";
      })
      .addCase(removeLike.rejected, (state, action) => {
        state.updateStatus = "failed";
      })

      .addCase(getAllImagesPostsFromUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllImagesPostsFromUser.fulfilled, (state, action) => {
        state.images = action.payload;
        state.status = "succeeded";
      })
      .addCase(getAllImagesPostsFromUser.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

/*
export const selectAllTodos = (state) => state.todos.todos
export const getTodosStatus = (state) => state.todos.status
export const getTodosError = (state) => state.todos.error
*/

//export const { todoAdded, reactionAdded } = todosSlice.actions
export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getUpdatedStatus = (state) => state.posts.updateStatus;
export const getCurrentPost = (state) => state.posts.currentPost;
export const selectAllPostsImages = (state) => state.posts.images;
export const getPostsImagesStatus = (state) => state.posts.imagesStatus;

export const selectPageStatus = (state) => state.posts.pageStatus;

export const selectChangePostStatus = (state) => state.posts.changePostStatus;

export const selectNewEntryStatus = (state) => state.posts.newEntryStatus;

export default postsSlice.reducer;
