import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableWithoutFeedback,
} from 'react-native';


var initialData = [];
type Props = {};
let timestamp = null;
let rowHeight = 15;

const styles = StyleSheet.create({
  container:{
    flex:1,
		flexDirection: 'row',
  },
	alphabetisedList: {
	},
	alphabetisedListView:{
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	content: {
		flex: 9,
	},
	rowContent:{
    paddingLeft:10,
    paddingRight:10,
		height: 15,
		alignItems: 'center',
		justifyContent: 'center',
	},
	alphabet:{
		fontSize: 11,
		color: '#000'
	},
  selection:{
    padding:20,
    fontSize:75,
    color: '#000',
  }
});

export default class AlphabetisedScrollList extends Component<Props> {

  constructor(props) {
    super(props);
		const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    initialData = [
        {'title':'A', data:[]},
        {'title':'B', data:[]},
        {'title':'C', data:[]},
        {'title':'D', data:[]},
        {'title':'E', data:[]},
        {'title':'F', data:[]},
        {'title':'G', data:[]},
        {'title':'H', data:[]},
        {'title':'I', data:[]},
        {'title':'J', data:[]},
        {'title':'K', data:[]},
        {'title':'L', data:[]},
        {'title':'M', data:[]},
        {'title':'N', data:[]},
        {'title':'O', data:[]},
        {'title':'P', data:[]},
        {'title':'Q', data:[]},
        {'title':'R', data:[]},
        {'title':'S', data:[]},
        {'title':'T', data:[]},
        {'title':'U', data:[]},
        {'title':'V', data:[]},
        {'title':'W', data:[]},
        {'title':'X', data:[]},
        {'title':'Y', data:[]},
        {'title':'Z', data:[]},
      ];

    this.state = {
      	dataSource: dataSource.cloneWithRows(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']),
				currentlySelected: 'A',
    };
    this.scrollEvent = this.scrollEvent.bind(this);
		this.lastSelectedIndex = null;
	}

  scrollEvent(e){
		this.handleSelection(e.nativeEvent.touches[0].pageY, e.nativeEvent.timestamp);
	}

  componentDidMount() {
    this.fixSectionItemMeasure();

  }

	componentWillUnmount() {
    this.measureTimer && clearTimeout(this.measureTimer);
		this.lastSelectedIndex = null;
  }

	fixSectionItemMeasure() {
    const sectionItem = this._list;
    if (!sectionItem) {
      return;
    }

    this.measureTimer = setTimeout(() => {
      sectionItem.measure((x, y, width, height, pageX, pageY) => {
				this.setState({
	 			 startOfList: pageY,
	 			 heightOfList: height,
	 			 paddingTopOfList: (pageY - y),
	 		 })
      })
    }, 0);
  }

  handleSelection(pageY, eventTimestamp){

    if (timestamp === null){
      timestamp = eventTimestamp;
    } else {
      if ((eventTimestamp - timestamp) < 1500){
        return;
      }
    }

		let index = 0;

		const numberOfAlphabets = this.state.dataSource.getRowCount();
		const contactListHeight = this.state.heightOfList;
		const topPaddingHeight = this.state.paddingTopOfList;

		//Y offset of page
		const startOfList = this.state.startOfList;
		const bottomPaddingHeight = (contactListHeight - topPaddingHeight) - (numberOfAlphabets * rowHeight);
		const bottomPaddingY = topPaddingHeight + (numberOfAlphabets * rowHeight);

		if (pageY >= startOfList && pageY < topPaddingHeight){
			//return firstItem
			index = 0;
		} else if (pageY >= bottomPaddingY){
			//return lastItem
			index = numberOfAlphabets - 1; //last item in index
		} else {
			index = Math.floor((pageY - topPaddingHeight)/ rowHeight);
		}
		//parseIndex to alphabet
		if (index >= 0){
			// this.goToSection(this.state.dataSource.getRowData(0, index));
			this.lastSelectedIndex = index;
      this.setState({
        currentlySelected: this.state.dataSource.getRowData(0, index),
      })
		} else {
			console.log("invalid index or same index with lastSelectedIndex");
		}
	}

  render() {

    const returnTrue = () => true;

    return (
      <View style={styles.container}>
						<View style={styles.content}>
            <Text style={styles.selection}>{this.state.currentlySelected}</Text>
						</View>
            <View ref={(c) => this._list = c} collapsable={false} style={styles.alphabetisedListView} onStartShouldSetResponder={returnTrue} onMoveShouldSetResponder={returnTrue} onResponderGrant={this.scrollEvent} onResponderMove={this.scrollEvent} onResponderRelease={this.resetGesture}>
            	<ListView
								style={styles.alphabetisedList}
								dataSource={this.state.dataSource}
								renderRow={(data) =>
									<View style={styles.rowContent}>
										<TouchableWithoutFeedback onPress={() => {this.goToSection(data)}}>
											<View>
												<Text style={styles.alphabet}>{data}</Text>
											</View>
										</TouchableWithoutFeedback>
									</View>
								}
								scrollEnabled={false}
							/>
						</View>
				</View>
    );
  }
}
