export default async function handler(req, res){
    res.setHeader("Access-control-Allow-Origin", "https://emaanmasood.github.io");
    res.setHeader("Access-control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-control-Allow-Methods", "Content-Type");
    if(req.method === "OPTIONS"){
        return res.status(200).end();
    }
    if(req.method !== "POST"){
        return res.status(405).json({
            message: "Method not allowed"

        });
    }
    try{
        const{ name, email, message } = req.body;
        if(!name || !email || !message){
            return res.status(400).json({message:"Please fill all fields"});
        }
        const response = await fetch("https://api.resend.com/emails",{
            method: "POST",
            headers:{
                "content-type": "application/json",
                "authorization": `Bearer ${process.env.RESEND_API_KEY}`
            },
            body:JSON.stringify({from: "onboarding@resend.dev",
                 to:"emaanmasood1228@gmail.com", 
                  subject:"New message from contact form ",
                  html: `
                  <h2>New contactForm Message</h2>
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Message:</strong> ${message}</p>
                  `
                })
            });
            const data = await response.json();
            if (!response.ok) {
                return res.status(response.status).json(data);
            }
            return res.status(200).json({
                message: "Email sent successfully"
            });
    }
    catch (error){
        console.error(error);

        return res.status(500).json({
            message: "something went wrong"
        });
    }
    
}