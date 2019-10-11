module.exports.findtheId = function (haystack, needle, addCom) {
    let queue = [];
    let tempArr = JSON.parse(JSON.stringify(haystack))
    queue.push(tempArr)
    while (queue.length) {
        let currentNode = queue.shift();
        if (currentNode._id === needle) {
            currentNode.replies.push(addCom)
            return tempArr.replies
        }
        if (currentNode.replies) {
            currentNode.replies.forEach(res => {
                queue.push(res)
            })
        }

    }

    return tempArr
}

module.exports.findToEdit = function (haystack, needle, editCom) {
    let queue = [];
    let tempArr = JSON.parse(JSON.stringify(haystack))
    queue.push(tempArr)
    while (queue.length) {
        let currentNode = queue.shift();
        if (currentNode._id === needle) {
            currentNode.comment = editCom
            return tempArr.replies
        }
        if (currentNode.replies) {
            currentNode.replies.forEach(res => {
                queue.push(res)
            })
        }

    }

    return tempArr
}