export const traverse = (haystack) => {
    let queue = [];
    let q = []
    let tempArr = JSON.parse(JSON.stringify(haystack))
    queue.push(tempArr)
    while (queue.length) {
        let currentNode = queue.shift();
        q.push(currentNode)
        if (currentNode.replies) {
            currentNode.replies.forEach(res => {
                queue.push(res)
            })
        }
    }
    return q
}

export const structureRes = (comments) => {
    let res = traverse(comments)
    res.forEach(val => {
        console.log(val.replies.length)
        for (let i = 0; i < val.replies.length; i++) {
            console.log(val.replies[i].comment)
        }
    })
}

export const isMyComments = (id) => {
    if (localStorage.getItem('UserId') === id) {
        return true
    }
    else {
        return false
    }
}