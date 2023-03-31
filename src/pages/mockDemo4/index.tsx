import GraphEditor from '@/components/GraphEditor/editorReact';
import { useState } from 'react';
const MockHtml4 = () => {
  const [editorValue, setEditorValue] = useState<string | undefined>(
    '{json:"1233"}',
  );
  const onChangeEditorValue = (val: string | undefined) => {
    setEditorValue(val);
  };
  return (
    <div>
      sd
      <GraphEditor
        value={editorValue}
        changeValue={onChangeEditorValue}
        isREadOnly={true}
      />
    </div>
  );
};
export default MockHtml4;
