import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native';
import useTheme from '../Theme';
import Card from './Card';

type Tab = {
  headerTitle?: string;
  title: string;
  content: React.ReactNode;
};

function TabSelector(props: {
  tabs: Tab[];
  tabIndex: number;
  setTabIndex: (index: number) => void;
}) {
  const theme = useTheme();

  const activeStyle: StyleProp<TextStyle> = {
    fontWeight: '700',
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary,
    color: theme.colors.primary,
  };

  return (
    <View style={styles.tabSelector}>
      {props.tabs.map((tab, index) => (
        <Pressable
          key={tab.title}
          style={styles.tabSelectorItem}
          onPress={() => props.setTabIndex(index)}>
          <Text style={props.tabIndex === index ? activeStyle : {}}>
            {tab.title}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

type Props = {
  tabs: Tab[];
  title?: string;
  tabIndex: number;
  setTabIndex: (tabIndex: number) => void;
};

export default function TabCard({tabs, title, tabIndex, setTabIndex}: Props) {
  return (
    <Card>
      <View style={styles.header}>
        <Text style={styles.title}>{tabs[tabIndex].headerTitle || title}</Text>
        <TabSelector
          tabs={tabs}
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
        />
      </View>
      {tabs[tabIndex].content}
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    flexGrow: 1,
  },
  tabSelector: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  tabSelectorItem: {
    marginLeft: 8,
  },
});
