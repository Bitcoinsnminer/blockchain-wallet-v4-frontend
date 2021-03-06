import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { path } from 'ramda'

import media from 'services/ResponsiveService'

import KYCBanner from 'components/IdentityVerification/KYCBanner'
import GetStarted from './GetStarted'
import Shapeshift from './Shapeshift'
import Info from './Info'
import Exchange from './ExchangeContainer'

import { getData } from './selectors'

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
`

const Container = styled.section`
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  @media (min-width: 992px) {
    flex-direction: row;
  }

  ${media.mobile`
    align-items: center;
    padding: 10px;
  `};
`
const ShapeshiftContainer = styled(Container)`
  height: 100%;
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`
const ColumnLeft = styled(Column)`
  align-items: flex-end;
  margin-right: 10px;
  & > :first-child {
    margin-bottom: 10px;
  }
  @media (min-width: 992px) {
    width: 60%;
  }

  ${media.mobile`
    margin-right: 0;
  `};
`
const ColumnRight = styled(Column)`
  padding: 0;
  margin-bottom: 10px;
  box-sizing: border-box;
  @media (min-width: 992px) {
    width: 40%;
  }
`
const ExchangeScene = ({ useShapeShift, location, showGetStarted }) => (
  <Wrapper>
    {useShapeShift && (
      <ShapeshiftContainer>
        <ColumnLeft>
          <Shapeshift />
        </ColumnLeft>
        <ColumnRight>
          <Info />
        </ColumnRight>
      </ShapeshiftContainer>
    )}
    {!useShapeShift && !showGetStarted && <KYCBanner outsideOfProfile />}
    {!useShapeShift &&
      !showGetStarted && (
        <Container>
          <Column>
            <Exchange
              from={path(['state', 'from'], location)}
              to={path(['state', 'to'], location)}
            />
          </Column>
        </Container>
      )}
    {!useShapeShift && showGetStarted && <GetStarted />}
  </Wrapper>
)

export default connect(getData)(ExchangeScene)
