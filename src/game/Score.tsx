
import React, {FunctionComponent} from 'react'

interface ScoreProps {
    score: number;
    best: number;
}
interface ScoreBoxInterface {
    score: number,
    title: string
}

const Score: FunctionComponent<ScoreProps> = ({ score, best }) => {
    return (
      <div className="flex gap-4 mb-6">
          <ScoreBox score={score} title={"Score"}/>
          <ScoreBox score={best} title={"Best"}/>
      </div>
    );
};


const ScoreBox: FunctionComponent<ScoreBoxInterface> = ({title, score}) => {
    return (
      <div className="flex-1 bg-[#bbada0] rounded-md p-3 text-white text-center">
          <div className="text-sm font-medium uppercase tracking-wide opacity-70">{title}</div>
          <div className="text-2xl font-bold">{score}</div>
      </div>
    )
}

export default Score;
