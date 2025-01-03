import StyledEditorCard from "./styled-editor-card";
import Heading from "@components/common/heading";

const EditorCard = ({ id, title, linkUrl, imageUrl }) => {
  return (
    <StyledEditorCard id={id} className="editor-card" href={linkUrl}>
      <div className="editor-card-img" style={{backgroundImage: `url("/icons/${imageUrl}")`}}></div>
      <Heading className="editor-card-title" level={4} label={title} />
    </StyledEditorCard>
  );
};

export default EditorCard;