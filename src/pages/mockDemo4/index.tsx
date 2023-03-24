import GraphEditor from '@/components/GraphEditor/editorReact';
import { useState } from 'react';
const MockHtml4 = () => {
  const [editorValue, setEditorValue] = useState<string | undefined>('');
  const onChangeEditorValue = (val: string | undefined) => {
    setEditorValue(val);
  };
  return (
    <div>
      <GraphEditor
        value={editorValue}
        changeValue={onChangeEditorValue}
        isREadOnly={false}
      />
    </div>
  );
};
export default MockHtml4;
