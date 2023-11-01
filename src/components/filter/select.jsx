import * as S from './select.styles'


const MySelect = ({options, defaultValue, value, onChange}) => (
        <S.select
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            <option disabled value="">{defaultValue}</option>
            {options.map(option =>
                <option key={option.id} value={option.author}>
                    {option.author}
                </option>
            )}
        </S.select>
    );

export default MySelect;