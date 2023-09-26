import React from 'react'
import styled, {keyframes} from 'styled-components'

const run = keyframes`
  0% {
    background-position: 100% 0; /* Первая позиция: сдвиг фона вправо */
  }
  100% {
    background-position: -100% 0; /* Вторая позиция: сдвиг фона влево */
  }
`

const SkeletonStyled = styled.li`
  width: 186px;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 312px;
`

const SkeletonStyledBody = styled.div`
  background: ${({theme}) => theme.gradients.skeleton};
  background-size: 200% 100%;
  background-position: -100% 0;
  border-radius: 2px;
  border: 1px solid ${({theme}) => theme.colors.palette.skeletonBorder};
  animation: ${run} 2s linear infinite;
  height: 260px;
`

const SkeletonStyledTitle = styled.div`
  background: ${({theme}) => theme.gradients.skeleton};
  background-size: 200% 100%;
  background-position: -100% 0;
  animation: ${run} 2s linear infinite;
  height: 22px;
  margin-bottom: 10px;
`

export const Skeleton = () => {
    return (
        <SkeletonStyled>
            <SkeletonStyledBody />
            <SkeletonStyledTitle />
        </SkeletonStyled>
    )
}
