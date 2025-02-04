import {clientsArray} from "../util/SessionUtil";

export async function setProfileName(req, res) {
    const session = req.session
    const {name} = req.body

    if (!name)
        return res.status(401).send({message: 'Digite um novo nome de perfil.'});

    try {
        await clientsArray[session].setProfileName(name);
        return res.status(201).json({
            response: {
                status: true,
                name: name,
                session: session
            },
        })
    } catch (error) {
        res.status(400).json({
            response: {
                message: 'O nome de usuário de perfil não foi alterado.',
                session: session,
                log: error
            },
        })
    }
}

export async function setProfileImage(req, res) {
    const session = req.session
    const {path} = req.body

    if (!path)
        return res.status(401).send({message: 'Informe o caminho da imagem.'});

    try {
        await clientsArray[session].setProfilePic(path);
        res.status(201).json({
            response: {
                message: "Foto alterada com sucesso",
                session: session,
                path: path
            },
        })
    } catch (error) {
        res.status(400).json({
            response: {
                message: 'A foto de perfil não foi alterada.',
                session: session,
                log: error
            },
        })
    }
}

export async function showAllContacts(req, res) {
    const session = req.session

    try {
        const contacts = await clientsArray[session].getAllContacts();
        res.status(200).json({
            response: contacts,
            session: session,
        })
    } catch (error) {
        res.status(401).json({
            response: 'Erro ao buscar os contatos.',
            session: session,
        })
    }
}