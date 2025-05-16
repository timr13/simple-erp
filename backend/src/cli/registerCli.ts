import { Option, program } from "commander"
import { config } from "../config"

let cliActive = false

export const registerCli = async() => {
    program.command("add-admin")
            .exitOverride()
            .option("-r, --release <release>","","latest")
            .action(async (options:{
                release:string
            })=>{
                if(config.activeAdmin)
                {
                    console.log("Admin already active")
                    return
                }
                
            })
    program.exitOverride()
    process.stdin.on('data',(data)=>{
        const command = data.toString()
        if(cliActive)
        {
            try
            {
                program.parse(command.trim().split(' '),{from:"user"})
            }
            catch {

            }
        }
        else if(command.trim() === "start-cli")
        {
           cliActive = true;
        }
    })
}