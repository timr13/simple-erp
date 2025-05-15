import { existsSync } from "fs"
import { config } from "."
import { join } from "path"

export const generateConfig = async () => {
    config.activeAdmin = existsSync(join(
        import.meta.dirname,
        '..',
        '..',
        'static',
        'admin'
    ))
    console.log(config)
}