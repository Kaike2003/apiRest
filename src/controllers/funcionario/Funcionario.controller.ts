import { Schema_atualizar_palavra_passe_admin, Schema_criar_admin, Schema_recuperar_palavra_passe_admin, TSchema_atualizar_palavra_passe_admin, TSchema_autenticar_admin, TSchema_criar_admin, TSchema_recuperar_palavra_passe_admin, Schema_login_admin, TSchema_login_admin } from './../../validation/admin.validation';
import { Request, Response } from "express";
import PalavraPasse from '../../service/PalavraPasse';
import { prisma } from '../../../prisma/prisma';
import Nodemailer from '../../service/Nodemailer';
import GerarString from '../../service/Gerar_String';
import NodemailerPalavraPasse from '../../service/NodemailerPalavraPasse';
import CompararPalavraPasse from '../../service/Comparar_palavra_passe';
import Jwt from '../../service/Jwt';
import { Schema_criar_funcionario, TSchema_criar_funcionario } from '../../validation/funcionario.validation';
import FuncionalidadesController from '../funcionalidades/Funcionalidades.controller';


export default class FuncinarioController extends FuncionalidadesController {

    protected async criar_funcionario(req: Request, res: Response) {

        const string_aleatoria = new GerarString().geradorStrings()
        const { nome, email, palavra_passe, telefone, data_nascimento }: TSchema_criar_funcionario = req.body
        Schema_criar_funcionario.parseAsync({
            nome: nome,
            email: email,
            palavra_passe: palavra_passe,
            telefone: telefone,
            data_nascimento: new Date(data_nascimento)
        }).then(async (sucesso_validacacao) => {

            const result_admin_telefone = await prisma.utilizador.findUnique({
                where: {
                    telefone: telefone,
                }
            })

            if (!result_admin_telefone) {
                const result_admin = await prisma.utilizador.create({
                    data: {
                        nome: sucesso_validacacao.nome,
                        email: sucesso_validacacao.email,
                        palavra_passe: await new PalavraPasse().Encriptar(sucesso_validacacao.palavra_passe),
                        telefone: sucesso_validacacao.telefone,
                        data_nascimento: new Date(sucesso_validacacao.data_nascimento),
                        codigo_autenticacao: String(string_aleatoria),
                        classe: "FUNCIONARIO",
                        curso: "FUNCIONARIO",
                        tipo_utilizador: "FUNCIONARIO"
                    },
                    select: {
                        nome: true,
                        email: true,
                        telefone: true,
                        codigo_autenticacao: true,
                        classe: true,
                        curso: true,
                        banido: true,
                        tipo_utilizador: true
                    }
                })

                console.log(new Nodemailer().transporter(sucesso_validacacao.email, sucesso_validacacao.nome, string_aleatoria)
                )

                new Nodemailer().transporter(sucesso_validacacao.email, sucesso_validacacao.nome, string_aleatoria)

                res.status(201).json(result_admin)

            } else {

                if (result_admin_telefone.telefone === telefone || result_admin_telefone.email === email) {
                    res.status(400).json("Já existe um conta cadastrada com esse número. Crie sua conta com um seu número de telefone ou já existe um conta cadastrada com esse email. Crie sua conta com um seu número de email.")
                }

            }

        }).catch((err) => {
            res.status(400).json(err)
        })
    }

    protected async autenticar_funcionario(req: Request, res: Response) {
        const { codigo_autenticacao }: TSchema_autenticar_admin = req.body

        const result_codigo_autenticacao = await prisma.utilizador.findFirst({
            where: { codigo_autenticacao: codigo_autenticacao }
        })

        if (!result_codigo_autenticacao) {
            res.status(400).json(`Por favor, verifica o seu email e obtenha o código de autenticacao que enviamos para ti.`)
        } else {

            if (result_codigo_autenticacao.autenticado === "TRUE" && result_codigo_autenticacao.tipo_utilizador === "FUNCIONARIO") {
                res.status(400).json(`Está conta com o email ${result_codigo_autenticacao.email} já foi autenticada`)
            } else {
                if (result_codigo_autenticacao.codigo_autenticacao === codigo_autenticacao) {

                    const result_conta_admin_autenticada = await prisma.utilizador.update({
                        where: {
                            id: result_codigo_autenticacao.id
                        },
                        data: {
                            autenticado: "TRUE",
                        },
                        select: {
                            email: true,
                            autenticado: true
                        }
                    })

                    res.status(200).json(result_conta_admin_autenticada)
                }
            }

        }


    }

    protected async recuperar_palavra_passe_funcioario(req: Request, res: Response) {
        const { email }: TSchema_recuperar_palavra_passe_admin = req.body

        const string_aleatoria = new GerarString().geradorStrings()

        Schema_recuperar_palavra_passe_admin.parseAsync({
            email: email
        }).then(async (sucesso_validacao) => {

            const result_email = await prisma.utilizador.findUnique({
                where: {
                    email: sucesso_validacao.email
                }
            })

            if (!result_email) {
                res.status(400).json(`O email ${email} nao existe na aplicacao Suchen`)
            } else {
                if (result_email.email === email && result_email.tipo_utilizador === 'FUNCIONARIO') {
                    const result_palavra_passe_alterada = await prisma.utilizador.update({
                        where: {
                            email: result_email.email
                        },
                        data: {
                            palavra_passe: await new PalavraPasse().Encriptar(string_aleatoria),
                        },
                        select: {
                            nome: true,
                            email: true
                        }
                    })

                    new NodemailerPalavraPasse().transporter(result_email.email, result_email.nome, string_aleatoria)

                    res.status(200).json(result_palavra_passe_alterada)
                }
            }


        }).catch((err) => {
            res.status(400).json(err)
        })


    }

    protected async atualizar_palavra_passe_funcionario(req: Request, res: Response) {
        const { palavra_passe_antiga, palavra_passe_nova }: TSchema_atualizar_palavra_passe_admin = req.body
        const { id_utilizador } = req.params

        try {

            Schema_atualizar_palavra_passe_admin.parseAsync({
                palavra_passe_antiga: palavra_passe_antiga,
                palavra_passe_nova: palavra_passe_nova
            }).then(async (sucesso_validacao) => {

                if (!id_utilizador) {
                    res.status(400).json(`Por favor digite o numero do utilizador`)
                } else {

                    if (id_utilizador.length >= 15) {

                        const result_id_utilizador = await prisma.utilizador.findUnique({
                            where: {
                                id: id_utilizador
                            }
                        })

                        if (!result_id_utilizador) {
                            res.status(400).json(`O id do utilizador nao existe no Suchen`)
                        } else {

                            if (result_id_utilizador.id === id_utilizador) {

                                const comparado_palavra_passe = await new CompararPalavraPasse().comparar_palavra_passe(sucesso_validacao.palavra_passe_antiga, result_id_utilizador.palavra_passe)

                                if (comparado_palavra_passe === true && result_id_utilizador.tipo_utilizador === "FUNCIONARIO") {

                                    const palavra_passe_alterada = await prisma.utilizador.update({
                                        where: {
                                            email: result_id_utilizador.email
                                        },
                                        data: {
                                            palavra_passe: await new PalavraPasse().Encriptar(palavra_passe_nova)
                                        },
                                        select: {
                                            email: true,
                                            nome: true
                                        }
                                    })

                                    res.status(200).json(palavra_passe_alterada)

                                } else {
                                    res.status(400).json(`A palavra passe antiga ${palavra_passe_antiga} está incorreta.`)
                                }

                            }

                        }

                    }

                }

            }).catch((err) => {
                res.status(400).json(err)
            })

        } catch (error) {
            res.status(400).json(error)
        }


    }

    protected async login_funcionario(req: Request, res: Response) {
        const { email, palavra_passe }: TSchema_login_admin = req.body

        Schema_login_admin.parseAsync({
            email: email,
            palavra_passe: palavra_passe
        }).then(async (sucesso_validacao) => {

            const result_email = await prisma.utilizador.findUnique({
                where: {
                    email: sucesso_validacao.email
                }
            })

            if (!result_email) {
                res.status(400).json(`O email ${email} nao existe no suchen`)
            } else {
                if (result_email.email === sucesso_validacao.email && result_email.tipo_utilizador === "FUNCIONARIO") {
                    const senha_correta = await new CompararPalavraPasse().comparar_palavra_passe(sucesso_validacao.palavra_passe, result_email.palavra_passe)

                    if (senha_correta === true && result_email.autenticado === "TRUE" && result_email.banido === "FALSE" && result_email.tipo_utilizador === "FUNCIONARIO") {
                        const logado = new Jwt().token_sign(result_email.id)
                        res.status(200).json(logado)
                    } else {
                        res.status(400).json(`Credencias incorretas email:${sucesso_validacao.email}, palavra-passe:${sucesso_validacao.palavra_passe}`)
                    }

                }
            }

        }).catch((err) => {
            res.status(400).json(err)
        })



    }

   


}
