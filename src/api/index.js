import axios from "axios";

/////////////////////auth//////////////////////
export const signup = async (user) => {
  return await axios.post(`${process.env.REACT_APP_API}/signup`, user);
};

export const signin = async ({ email, password }) => {
  return await axios.post(`${process.env.REACT_APP_API}/signin`, {
    email,
    password,
  });
};

//////////////////user/////////////////////
export const currentUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
export const updateUser = async (authtoken, id, data) => {
  return await axios.patch(
    `${process.env.REACT_APP_API}/edit_profile/${id}`,
    data,
    {
      headers: {
        authtoken,
      },
    }
  );
};
export const getUser = async (authtoken, userId) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/${userId}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
export const deleteUser = async (authtoken, userId) =>
  await axios.post(
    `${process.env.REACT_APP_API}/delete_user/${userId}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUsers = async (page) =>
  await axios.get(`${process.env.REACT_APP_API}/users?page=${page}`);
// export const getFilteredUsers = async (data, page) =>
//   await axios.post(`${process.env.REACT_APP_API}/filters?page=${page}`, data);

/////////////chats///////////////////

// export const postRequest = async (url, body) => {
//   const response = await axios.post(
//     `${process.env.REACT_APP_API}/${url}`,
//     body
//   );
//   // if (!response.ok) {
//   //   let message = "Ann error occured...";
//   //   if (response.data?.message) {
//   //     message = response.data.message;
//   //   }
//   //   return { error: true, message };
//   // }
//   // console.log("data", data);
//   return response;
// };

// export const getRequest = async (userId) => {
//   // console.log("fdsfl;lkf;ldks");
//   const response = await fetch(`${process.env.REACT_APP_API}/chats/${userId}`);

//   const data = await response.json();

//   if (!response.ok) {
//     let message = "Ann error occured...";
//     if (data?.message) {
//       message = data.message;
//     }
//     return { error: true, message };
//   }
//   // console.log("data", data);
//   return data;
// };

/////////////////////////ORDERS//////////////////////
export const getOrders = async (page) => {
  return await axios.get(`${process.env.REACT_APP_API}/orders?page=${page}`);
};

export const getFilteredOrders = async (data, page) =>
  await axios.post(`${process.env.REACT_APP_API}/filters?page=${page}`, data);

export const getOrder = async (authtoken, id) =>
  await axios.post(
    `${process.env.REACT_APP_API}/order/${id}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );

export const addOrder = async (authtoken, data) =>
  await axios.post(`${process.env.REACT_APP_API}/new_order`, data, {
    headers: {
      authtoken,
    },
  });

export const editOrder = async (authtoken, orderId, data) =>
  await axios.patch(
    `${process.env.REACT_APP_API}/edit_order/${orderId}`,
    data,
    {
      headers: {
        authtoken,
      },
    }
  );

export const deleteOrder = async (authtoken, orderId, data) =>
  await axios.post(
    `${process.env.REACT_APP_API}/delete_order/${orderId}`,
    data,
    {
      headers: {
        authtoken,
      },
    }
  );
///////////////////////PROPOSAL///////////////////

export const getProposal = async (authtoken, id) =>
  await axios.post(
    `${process.env.REACT_APP_API}/proposal/${id}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );

export const addProposal = async (authtoken, data) =>
  await axios.post(`${process.env.REACT_APP_API}/new_proposal`, data, {
    headers: {
      authtoken,
    },
  });
export const updateProposal = async (authtoken, id, data) =>
  await axios.patch(`${process.env.REACT_APP_API}/edit_proposal/${id}`, data, {
    headers: {
      authtoken,
    },
  });

export const deleteProposal = async (authtoken, id, data) =>
  await axios.post(`${process.env.REACT_APP_API}/delete_proposal/${id}`, data, {
    headers: {
      authtoken,
    },
  });

export const acceptanceToggle = async (authtoken, id, data) =>
  await axios.patch(
    `${process.env.REACT_APP_API}/proposal_acceptance/${id}`,
    data,
    {
      headers: {
        authtoken,
      },
    }
  );

/////////////////////review///////////////////

export const addReview = async (authtoken, data) => {
  return await axios.post(`${process.env.REACT_APP_API}/add_review`, data, {
    headers: {
      authtoken,
    },
  });
};
export const updateReview = async (authtoken, id, data) => {
  return await axios.patch(
    `${process.env.REACT_APP_API}/edit_review/${id}`,
    data,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const deleteReview = async (authtoken, data) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/delete_review`,

    data,

    {
      headers: {
        authtoken,
      },
    }
  );
};

////////////////////////message

export const sendMessage = async (authtoken, data) =>
  await axios.post(`${process.env.REACT_APP_API}/send_message`, data, {
    headers: {
      authtoken,
    },
  });

//////////////////////PHOTOS

// export const addPhotos = async (data) =>
//   await axios.post(`${process.env.REACT_APP_API}/uploadData`, data);
// export const deletePhoto = async (orderId, _id) =>
//   await axios.post(`${process.env.REACT_APP_API}/delete_image`, {
//     _id,
//     orderId,
//   });
