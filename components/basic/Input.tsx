import styled from 'styled-components'

interface inputProps {
  labelName: string
  id: string
  type: string
  value: string
  onChange: (e: any) => void
}

export default function Input(props: inputProps) {
  return (
    <StyledDiv>
      <StyledLabel htmlFor={props.id}>{props.labelName}</StyledLabel>
      <StyledInput
        id={props.id}
        name={props.id}
        onChange={props.onChange}
        value={props.value}
      ></StyledInput>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  position: relative;
  margin-right: 16px;
`

const StyledLabel = styled.label`
  line-height: 28px;
  font-size: 14px;
`

const StyledInput = styled.input`
  width: 100%;
  line-height: 32px;
  padding: 4px 12px;
  border: 1px solid;
  border-radius: 4px;
  border-color: rgb(209, 213, 219);
  &:focus {
    outline: none;
    box-shadow: 0 0 2px red;
  }
`
