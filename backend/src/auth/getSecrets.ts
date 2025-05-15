import { Secret } from "@fastify/jwt";
import { createPrivateKey, createPublicKey, generateKeyPairSync } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";


export const getSecrets = () : {
    public: Secret,
    private: Secret
} => {

    const path = join(import.meta.dirname,"..","..","config","certificates")

    mkdirSync(path,{
        recursive:true
    })

    let public_key : Secret;
    let private_key : Secret;

    if(existsSync(join(path,"private.pem")))
    {
        private_key = readFileSync(join(path,"private.pem"))
        if(existsSync(join(path,"public.pem")))
        {
            public_key = readFileSync(join(path,"public.pem"))
        }
        else
        {
            const key = createPrivateKey(private_key)
            const priv_key = createPublicKey(key)
            public_key = priv_key.export({
                type:"spki",
                format:"pem"
            })
            writeFileSync(join(path,"public.pem"),public_key)
        }
    }
    else {
        const keys = generateKeyPairSync("ed25519");
        private_key = keys.privateKey.export({
            type:"pkcs8",
            format:"pem"
        })
        public_key = keys.publicKey.export({
            type:"spki",
            format:"pem"
        })
        writeFileSync(join(path,"public.pem"),public_key)
        writeFileSync(join(path,"private.pem"),private_key)
    }
    
    

    return {
        public:public_key,
        private:private_key
    }
}