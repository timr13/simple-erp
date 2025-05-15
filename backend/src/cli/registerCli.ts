import { config } from "../config"

export const registerCli = async() => {
    process.stdin.on('data',(data)=>{
        const command = data.toString()
        if(command.trim() === "activate-admin")
        {
            if(config.activeAdmin)
            {
                console.log("Admin panel already active")
                return
            }
        }
    })
}