import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";



class NpsController {

    /**
     * 
     * Detratores => 0 - 6
     * Passivos => 7 - 8
     * Promotores => 9 - 10
     * (Números de promoteres - número de detratores) / (número de respondentes) x 100
     */

    async execute(request: Request, response: Response){

        const { survey_id } = request.params;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveysUsers = await surveysUsersRepository.find({
            survey_id,
            value: Not(IsNull())
        })

        const detrator = surveysUsers.filter(
            (survey) => survey.value >= 0 &&  survey.value <= 6
        ).length;

        const promoters = surveysUsers.filter(
            (survey) => survey.value >= 9 && survey.value <= 10
        ).length;

        const passivos = surveysUsers.filter(
            (survey) => survey.value >= 7 && survey.value <= 8
        ).length;


        const totalAnswers = surveysUsers.length;


        const calculate = Math.round(((promoters - detrator) / totalAnswers) * 100);

        return response.json({
            detrator, 
            promoters,
            passivos,
            totalAnswers,
            nps: calculate
        })
    }
}

export  { NpsController }