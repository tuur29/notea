import Tree from '@atlaskit/tree'
import HotkeyTooltip from 'components/hotkey-tooltip'
import IconButton from 'components/icon-button'
import TreeActions, { DEFAULT_TREE, ROOT_ID } from 'libs/shared/tree'
import useI18n from 'libs/web/hooks/use-i18n'
import EditorState from 'libs/web/state/editor'
import NoteTreeState from 'libs/web/state/tree'
import { cloneDeep, forEach } from 'lodash'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import SidebarListItem from './sidebar-list-item'

export const TableOfContents: FC = () => {
  const { t } = useI18n()
  const { editorEl } = EditorState.useContainer() // TODO: how to access editor from here?
  const [tree, setTree] = useState(DEFAULT_TREE)
  const [isFold, setFold] = useState(false)

  useEffect(() => {
    const headings = editorEl.current?.getHeadings();
    const newTree = DEFAULT_TREE; // TODO: parse headings into tree
    setTree(newTree);
  }, []) // TODO: listen to editor changes & current note changes

  const onCollapse = useCallback((id) => {
    setTree((prev) => TreeActions.mutateItem(prev, id, { isExpanded: false }))
  }, [])
  const onExpand = useCallback((id) => {
    setTree((prev) => TreeActions.mutateItem(prev, id, { isExpanded: true }))
  }, [])

  return (
    <>
      <div className="group p-2 text-gray-500 flex items-center sticky top-0 bg-gray-100 z-10">
        <div className="flex-auto flex items-center">
          <span>{t('Table of Contents')}</span>
        </div>
        <HotkeyTooltip text={t('Fold table of Contents')}>
          <IconButton
            icon="Selector"
            onClick={() => setFold((prev) => !prev)}
            className="text-gray-700 invisible group-hover:visible"
          ></IconButton>
        </HotkeyTooltip>
      </div>
      {!isFold ? (
        <div>
          <Tree
            onCollapse={onCollapse}
            onExpand={onExpand}
            tree={tree}
            offsetPerLevel={10}
            renderItem={({
              provided,
              item,
              onExpand,
              onCollapse,
              snapshot,
            }) => (
              <SidebarListItem
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                onExpand={onExpand}
                onCollapse={onCollapse}
                isExpanded={item.isExpanded}
                innerRef={provided.innerRef}
                hasChildren={!!item.children.length}
                item={{
                  ...item.data,
                  id: item.id,
                }}
                snapshot={snapshot}
              ></SidebarListItem>
            )}
          ></Tree>
        </div>
      ) : null}
    </>
  )
}
