import Fastify from "fastify";
import JWT from "@fastify/jwt"
import { getSecrets } from "./auth/getSecrets";
import { registerCli } from "./cli/registerCli";
import { generateConfig } from "./config/generateConfig";

const app = Fastify()

app.register(JWT,{
    secret: getSecrets(),
    sign:{
        algorithm:"EdDSA"
    }
})

registerCli()
generateConfig()

app.listen({
    port:3000
},(err,address)=>{
    if(!err)
    {
        console.log("Running on "+address)
    }
})