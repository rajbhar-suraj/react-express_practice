const express = require('express')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const cors = require('cors')
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const USERS = [{
    id: 0,
    role: "admin",
    email: "don@gmail.com",
    password: "123456"
}]
const QUESTIONS = [
    {
        id: 1,
        title: "Find Maximum Element",
        description: "Given an array of integers, return the maximum element.",
        Acceptance: "88%",
        difficulty: "Easy",
        tags: ["Array"],
        constraints: [
            "1 <= arr.length <= 10^5",
            "-10^4 <= arr[i] <= 10^4"
        ],
        testcase: [
            { input: "[1,9,3,4,2,1]", output: "9" },
            { input: "[10,25,5,8]", output: "25" }
        ]
    },
    {
        id: 2,
        Acceptance: "84%",

        title: "Reverse Array",
        description: "Given an array, return it in reverse order without using the reverse() method.",
        difficulty: "Easy",
        tags: ["Array", "Two Pointers"],
        constraints: [
            "1 <= arr.length <= 10^5",
            "-10^4 <= arr[i] <= 10^4"
        ],
        testcase: [
            { input: "[1,2,3,4,5]", output: "[5,4,3,2,1]" },
            { input: "[7,8,9]", output: "[9,8,7]" }
        ]
    },
    {
        id: 3,

        title: "Two Sum",
        description: "Given an array of integers and a target, return indices of the two numbers such that they add up to target.",
        difficulty: "Medium",
        Acceptance: "68%",

        tags: ["Array", "Hash Table"],
        constraints: [
            "2 <= arr.length <= 10^5",
            "-10^4 <= arr[i] <= 10^4",
            "-10^4 <= target <= 10^4"
        ],
        testcase: [
            { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
            { input: "nums = [3,2,4], target = 6", output: "[1,2]" }
        ]
    },
    {
        id: 4,

        title: "Move Zeroes",
        Acceptance: "82%",

        description: "Move all zeroes in the array to the end while maintaining the relative order of non-zero elements.",
        difficulty: "Easy",
        tags: ["Array", "Two Pointers"],
        constraints: [
            "1 <= arr.length <= 10^5",
            "-2^31 <= arr[i] <= 2^31 - 1"
        ],
        testcase: [
            { input: "[0,1,0,3,12]", output: "[1,3,12,0,0]" },
            { input: "[0,0,1]", output: "[1,0,0]" }
        ]
    },
    {
        id: "5",

        title: "Contains Duplicate",
        description: "Return true if any value appears at least twice in the array, otherwise false.",
        difficulty: "Easy",
        Acceptance: "79%",

        tags: ["Array", "Hash Table"],
        constraints: [
            "1 <= arr.length <= 10^5",
            "-10^9 <= arr[i] <= 10^9"
        ],
        testcase: [
            { input: "[1,2,3,1]", output: "true" },
            { input: "[1,2,3,4]", output: "false" }
        ]
    },
    {
        id: 6,
        title: "Best Time to Buy and Sell Stock",
        Acceptance: "77%",

        description: "Given an array where the i-th element is the price of a stock on day i, return the maximum profit.",
        difficulty: "Easy",
        tags: ["Array", "Dynamic Programming"],
        constraints: [
            "1 <= prices.length <= 10^5",
            "0 <= prices[i] <= 10^4"
        ],
        testcase: [
            { input: "[7,1,5,3,6,4]", output: "5" },
            { input: "[7,6,4,3,1]", output: "0" }
        ]
    },
    {
        id: 7,
        Acceptance: "55%",

        title: "Product of Array Except Self",
        description: "Return an array output where output[i] is the product of all elements except nums[i].",
        difficulty: "Medium",
        tags: ["Array", "Prefix Sum"],
        constraints: [
            "2 <= nums.length <= 10^5",
            "-30 <= nums[i] <= 30"
        ],
        testcase: [
            { input: "[1,2,3,4]", output: "[24,12,8,6]" },
            { input: "[-1,1,0,-3,3]", output: "[0,0,9,0,0]" }
        ]
    },
    {
        id: 8,

        title: "Maximum Subarray",
        description: "Find the contiguous subarray with the largest sum.",
        difficulty: "Medium",
        Acceptance: "45%",

        tags: ["Array", "Dynamic Programming"],
        constraints: [
            "1 <= nums.length <= 10^5",
            "-10^4 <= nums[i] <= 10^4"
        ],
        testcase: [
            { input: "[-2,1,-3,4,-1,2,1,-5,4]", output: "6" },
            { input: "[1]", output: "1" }
        ]
    },
    {
        id: 9,
        title: "Rotate Array",
        description: "Rotate the array to the right by k steps, where k is non-negative.",
        difficulty: "Medium",
        Acceptance: "82%",

        tags: ["Array"],
        constraints: [
            "1 <= nums.length <= 10^5",
            "-2^31 <= nums[i] <= 2^31 - 1",
            "0 <= k <= 10^5"
        ],
        testcase: [
            { input: "nums = [1,2,3,4,5,6,7], k = 3", output: "[5,6,7,1,2,3,4]" },
            { input: "nums = [-1,-100,3,99], k = 2", output: "[3,99,-1,-100]" }
        ]
    },
    {
        id: 10,
        Acceptance: "77%",

        title: "Merge Intervals",
        description: "Given a collection of intervals, merge all overlapping intervals.",
        difficulty: "Medium",
        tags: ["Array", "Sorting"],
        constraints: [
            "1 <= intervals.length <= 10^4",
            "intervals[i].length == 2",
            "0 <= start <= end <= 10^4"
        ],
        testcase: [
            { input: "[[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" },
            { input: "[[1,4],[4,5]]", output: "[[1,5]]" }
        ]
    }
];

let givenId = 1;
app.get('/', (req, res) => {
    res.send('hello world')
})
const SUBMISSIONS = []


app.post('/signup', (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) return res.status(402).json({ message: "Data not found" })

    const isVerifying = USERS.some((u) => u.email === email)

    if (isVerifying) return res.status(402).json({ message: "Email already taken" })

    const userData = {
        email,
        password,
        id: givenId++
    }
    const result = USERS.push(userData);
    console.log(USERS)
    return res.status(200).json({ success: true, message: "User registered successfully", email: userData.email })
})


app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(402).json({ message: "Data not found" })


    const user = USERS.find(u => u.email === email)

    if (!user) return res.status(402).json({ message: "User not found" })

    if (user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign({ id: user.id }, 'jwt_secret')

    return res.status(200).json({ message: "User Login successfully", email: user.email, token: token })
})

app.get('/questions', (req, res) => {
    const filteredQuestions = QUESTIONS.map(x => ({
        problemId: x.id,
        difficulty: x.difficulty,
        title: x.title,
        acceptance:x.Acceptance

    }))

    console.log(filteredQuestions)

    return res.status(200).json({ message: "All Question", filteredQuestions })
})


app.get('/question/:id', (req, res) => {
    const questionId = req.params.id

    const question = QUESTIONS.find(q => q.id == questionId);
    console.log(question)
    return res.status(200).json({success:true, message: "Question fetched", question })
})



const auth = async (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.json({ message: "header not found" })
    }

    try {
        const decoded = jwt.verify(authHeader, "jwt_secret")
        console.log("decoded", decoded)
        if (decoded && decoded.id) {

            req.userId = decoded.id;
            next()
        }

    } catch (error) {
        return res.status(403).json({ message: "not authorized for the current action" })
    }
}
app.get('/me', auth, (req, res) => {
    const userId = req.userId;
    const user = USERS.find(u => u.id === userId)

    return res.status(200).json({ success: true, message: "Authorized user", id: userId })
})


app.post('/submissions', auth, (req, res) => {
    const { questionId, code } = req.body
    const random = Math.random()
    const isSubmitted = SUBMISSIONS.some(s => s.questionId === questionId)
    const userId = req.userId
    if (isSubmitted) return res.status(200).json({ message: "you have already submitted the code" })

    if (random > 0.5) {

        const subData = {
            userId,
            questionId,
            code,
            passed: true
        }
        SUBMISSIONS.push(subData)
        
        return res.status(201).json({ message: "All test cases passed" })
    }
    const subData = {
        userId,
        questionId,
        code,
        passed: false
    }
    SUBMISSIONS.push(subData)

    return res.status(200).json({ message: "Wrong code",response: subData })
})

//submission of specific question
app.get('/submissions/:questionId', auth, (req, res) => {
    const userId = req.userId //coming from middleware
    const problemId = parseInt(req.params.questionId, 10); // ensure number

    console.log(problemId, userId)
    console.log(SUBMISSIONS)
    const questionSubmissions = SUBMISSIONS.find(s => s.userId === userId && s.questionId === problemId)
    console.log(questionSubmissions)
    if (!questionSubmissions) return res.status(400).json({ message: "You have not submitted any solutions yet" })

    return res.status(200).json({ message: "Your submissions",questionSubmission: questionSubmissions })
})

//all submissions of users
app.get('/submissions', auth, (req, res) => {
    const userId = req.userId //coming from middleware

    const userSubmissions = SUBMISSIONS.find(s => s.userId === userId)
    if (!userSubmissions) return res.status(400).json({ message: "You have not submitted any solutions yet" })

    return res.status(200).json({ message: "Your submissions", userSubmissions })
})


app.post('/createQuestion', (req, res) => {
    const { role, title, description, testcase } = req.body
    if (role !== "admin") {
        return res.status(403).json({ message: "Unauthorized for creating a question" })
    }
    const questionData = {
        title,
        description,
        testcase
    }

    const result = QUESTIONS.push(questionData)
    return res.status(201).json({ message: "Question created successfully", result })
})


const PORT = process.env.PORT || 5001
app.listen(PORT, () => console.log(`Server is running on ${PORT}`))