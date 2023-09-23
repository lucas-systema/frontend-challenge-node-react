import axios from 'axios'
import 'dotenv/config'
import { randomUUID } from "crypto"

const { CHALLENGEAPI } = process.env

export class ChallengeApi {

    async list(params) {
        const paginateResults = (model, params) => {
            let newResults = []
            const pagination = {}
            const page = parseInt(params?.page || 1);
            const limit = parseInt(params?.limit || 10);

            // calculating the starting and ending index
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            const results = {};
            if (endIndex < model.length) {
                pagination.next = {
                    page: page + 1,
                    limit: limit
                };
            }

            if (startIndex > 0) {
                pagination.previous = {
                    page: page - 1,
                    limit: limit
                };
            }

            results.results = model.slice(startIndex, endIndex);
            results.pagination = pagination;

            newResults = results;

            return newResults
        }

        const users = await axios.get(CHALLENGEAPI)
            .then(response => response.data)
            .catch(error => {
                // handle error
                console.log(error);
            })

        const cleanWord = (word) => {
            // eliminando acentuação
            word = word.replace(/[àáâãäå]/, "a");
            word = word.replace(/[èéêë]/, "e");
            word = word.replace(/[ìíîï]/, "i");
            word = word.replace(/[òóôõö]/, "o");
            word = word.replace(/[ùúûü]/, "o");
            word = word.replace(/[ç]/, "c");
            return word.replace(/[^a-z0-9]/gi, '');
        }

        const resultData = users.results
            .filter(user => {
                //Pesquisa por estado
                if (Object.keys(params).length > 0 && params.state) {
                    return cleanWord(user?.location?.state?.toLowerCase())
                        .includes(cleanWord(params.state.toLowerCase()))
                }
                return true
            })
            .filter(user => {
                //Pesquisa por nome
                if (Object.keys(params).length > 0 && params.name) {
                    return user.name.title.includes(params.name) || user.name.first.includes(params.name) || user.name.last.includes(params.name)
                }
                return true
            })

        const returnResult = paginateResults(resultData, params)

        return {
            "users": returnResult?.results || [],
            "pagination": returnResult?.pagination,
            "totalRegisters": resultData.length,
        }
    }

    async search() {
        const users = await axios.get(CHALLENGEAPI)
            .then(response => response.data)
            .catch(error => {
                // handle error
                console.log(error);
            })
        const user = users.find(element => element.id = id)

        return user
    }

    async get(id) {
        const users = await axios.get(CHALLENGEAPI)
            .then(response => response.data)
            .catch(error => {
                // handle error
                console.log(error);
            })
        const user = users.find(element => element.id = id)

        return user
    }

    create(user) {
        const userId = randomUUID()
        user['id'] = userId
        //this.#users.set(user)
    }

    update(user) {
        //this.#users.set(user)
    }

    delete(id) {
        //this.#users.delete(id)
    }
}
