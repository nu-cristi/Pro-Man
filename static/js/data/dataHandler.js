export let dataHandler = {
    getPublicBoards: async function () {
        const response = await apiGet("/api/boards/public")
        return response;
    },
    getPrivateBoards: async function (userId) {
        const response = await apiGet(`/api/boards/private?user=${userId}`);
        return response;
    },
    getBoard: async function (boardId) {
        return await postData("/api/get_board", {id: boardId})
        // the board is retrieved and then the callback function is called with the board
    },
    getStatuses: async function (boardId) {
        let data = await postData('/api/getStatuses', {boardId: boardId});
        return data
        // the statuses are retrieved and then the callback function is called with the statuses
    },
    getStatus: async function (statusId) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: async function (boardId) {
        return await apiGet(`/api/boards/${boardId}/cards/`);
    },
    getCard: async function (cardId) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: function (boardTitle, userId=null) {
        // creates new board, saves it and calls the callback function with its data
        return postData('/api/new_board', {title: boardTitle, user_id: userId})
            .then(data => {
                return data// JSON data parsed by `data.json()` call
            });
    

    },
    createNewCard: async function (cardTitle, boardId, statusId) {
        // creates new card, saves it and calls the callback function with its data
        return  postData("/api/new_card", {title:cardTitle, board_id: boardId, status: statusId, })
            .then(data => {
                return data // JSON data parsed by `data.json()` call
            })
    },

    renameBoard: function (id, boardTitle) {
        return postData("api/rename_board", {id: id, title: boardTitle})
            .then(data => {
                return data   // JSON data parsed by `data.json()` call
            })
    },

    renameColumn: function (columnId, newStatus) {
        let ColumnId = columnId[0]  // columnId = 1_1
        let boardId = columnId[2]
        // console.log(ColumnId, boardId);
        return postData("/api/rename_column", {id: ColumnId, title: newStatus})
            .then(data => {
                return data
            })
    },
    moveCards: async function (cardId, boardId, statusId, cardOrder) {
        return postData('/api/move_cards', {
            cardId: cardId,
            boardId: boardId,
            statusId: statusId,
            cardOrder: cardOrder,
        });
    },
    deleteBoard: async function (boardId) {
        return apiGet(`/api/delete-board/${boardId}`);
    },

    writeDefaultColumns: async function (boardId) {
        return postData('/api/default_columns', {boardId:boardId})
    },

    writeNewStatus: async function (columnTitle, boardId) {
        return postData("/api/column", {title: columnTitle, boardId: boardId})
    }
};


export async function postData(url = '', data = {}) {
            // Default options are marked with
            const response = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
            return response.json(); // parses JSON response into native JavaScript objects
        }



async function apiGet(url) {
    let response = await fetch(url, {
        method: "GET",
    });
    if (response.status == 200) {
        let data = response.json()
        return data;
    }
}

async function apiPost(url, payload) {
}

async function apiDelete(url) {
}

async function apiPut(url) {
}

async function apiPatch(url) {
}
