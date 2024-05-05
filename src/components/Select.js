import { Select as AntdSelect } from 'antd';

export default function CustomSelect({ defaultValue, onChange, options }) {
    return (
        <AntdSelect defaultValue={defaultValue} onChange={onChange}>
            {options.map((option) => (
                <AntdSelect.Option key={option.value} value={option.value}>
                    {option.label}
                </AntdSelect.Option>
            ))}
        </AntdSelect>
    );
}