import React from 'react';
import { Dimensions, View } from "react-native";
import ContentLoader, { Rect } from 'react-content-loader/native';

const { width: sWidth, height: sHeight } = Dimensions.get('window');

const ProductSkeleton = () => {
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <ContentLoader
                speed={2}
                width={sWidth}
                height={sHeight}
                viewBox={`0 0 ${sWidth} ${sHeight}`}
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                {/* Ảnh bìa */}
                <Rect x="0" y="0" rx="0" ry="0" width={sWidth} height={150} />
                {/* Thông tin quán */}
                <Rect x="15" y="170" rx="5" ry="5" width={sWidth - 30} height={20} />
                <Rect x="15" y="200" rx="5" ry="5" width={sWidth / 2} height={20} />

                {/* Giả lập danh sách món ăn */}
                {[0, 1, 2, 3].map((i) => {
                    const top = 240 + i * 120;
                    return (
                        <View key={i}>
                            <Rect x="15" y={top} rx="5" ry="5" width={80} height={80} />
                            <Rect x="110" y={top} rx="5" ry="5" width={sWidth - 130} height={20} />
                            <Rect x="110" y={top + 30} rx="5" ry="5" width={sWidth / 3} height={20} />
                            <Rect x="110" y={top + 60} rx="5" ry="5" width={sWidth - 130} height={15} />
                        </View>
                    );
                })}
            </ContentLoader>
        </View>
    );
};

export default ProductSkeleton;