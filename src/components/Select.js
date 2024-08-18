import { Select as AntdSelect } from 'antd';

export default function CustomSelect({ defaultValue, onChange, options, className }) {
    return (
        <AntdSelect defaultValue={defaultValue} onChange={onChange} className="lg:px-5 px-3 py-5 lg:py-6 text-[16px] lg:text-[18px] rounded-3xl border-[1px] bg-white custom-select">
            {options.map((option) => (
                <AntdSelect.Option key={option.value} value={option.value}>
                    {option.label}
                </AntdSelect.Option>
            ))}
        </AntdSelect>
    );
}
