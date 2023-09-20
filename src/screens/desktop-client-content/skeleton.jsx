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
  
  display: grid;
  grid-template-rows: 260px 22px;
  gap: 12px;
`

const SkeletonStyledBody = styled.div`
  background: ${({theme}) => theme.gradients.skeleton};
  background-size: 200% 100%;
  background-position: -100% 0;
  border-radius: 2px;
  border: 1px solid var(--dark-border-toolbar, #616161);
  animation: ${run} 2s linear infinite;
`

const SkeletonStyledTitle = styled.div`
  background: ${({theme}) => theme.gradients.skeleton};
  background-size: 200% 100%;
  background-position: -100% 0;
  animation: ${run} 2s linear infinite;
`

export const Skeleton = () => {
    return (
        <SkeletonStyled>
            <SkeletonStyledBody />
            <SkeletonStyledTitle />
        </SkeletonStyled>
    )
}
